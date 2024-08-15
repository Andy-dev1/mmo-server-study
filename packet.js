var zeroBuffer = Buffer.from("00", "hex");

module.exports = packet = {
  //params: an array of javascript objects to be turned into buffers
  build: function (params) {
    var packetParts = [];
    var packetSize = 0;

    params.forEach(function (param) {
      var buffer;

      if (typeof param === "string") {
        //do this
        buffer = Buffer.from(param, "utf8");

        buffer = Buffer.concat([buffer, zeroBuffer], buffer.length + 1);

        // A, B, C
        // FF,FF,FF,00
      } else if (typeof param === "number") {
        buffer = Buffer.alloc(2);
        buffer.writeUint16LE(param, 0);
      } else {
        console.log("Warning: Unknown data type in packet builder!");
      }
      packetSize += buffer.length;
      packetParts.push(buffer);
    });

    var dataBuffer = Buffer.concat(packetParts, packetSize);

    var size = Buffer.alloc(1);
    size.writeUint8(dataBuffer.length + 1, 0);

    var finalPacket = Buffer.concat(
      [size, dataBuffer],
      size.length + dataBuffer.length
    );

    return finalPacket;
  },

  //Parse a packet to be handled for a client
  parse: function (c, data) {
    var idx = 0;
    while (idx < data.length) {
      var packetSize = data.readUInt8(idx);
      var extractedPacket = new Buffer.from(packetSize);
      data.copy(extractedPacket, 0, idx, idx + packetSize);

      this.interpret(c, extractedPacket);

      idx += packetSize;
    }
  },
  interpret: function (c, datapacket) {
    var header = PacketModels.header.parse(datapacket);
    console.log("Interpert: " + header.command);

    switch (header.command.toUpperCase()) {
      case "LOGIN":
        var data = PacketModels.login.parse(datapacket);
        User.login(data.username, data.password, function (result, user) {
          if (result) {
            c.user = user;
            c.enterroom(c.user.current_room);
            c.socket.write(
              packet.build([
                "LOGIN",
                "TRUE",
                c.user.current_room,
                c.user.pos_x,
                c.user.pos_y,
                c.user.username,
              ])
            );
          } else {
            c.socket.write(packet.build(["LOGIN", "FALSE"]));
          }
        });
        break;
      case "REGISTER":
        break;
    }
  },
};

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
};

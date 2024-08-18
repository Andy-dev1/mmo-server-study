//Used to represent our client
var now = require("performance-now");

var _ = require("underscore");

module.exports = function () {
  var client = this;
  //These objects will be added at runtime
  //this.socket={}
  //this.user={}

  //Initialization
  this.initiate = () => {
    //Send the connection handshake packet to the client
    client.socket.write(packet.build(["HELLO", now().toString()]));
    console.log("Client initiated");
    //console.log(packet.build(["HELLO", now().toString()]));
  };
  //Clients Methods
  this.enterroom = function (selected_room) {
    maps[selected_room].clients.forEach(function (otherClient) {
      otherClient.socket.write(
        packet.build([
          "ENTER",
          client.user.username,
          client.user.pos_x,
          client.user.pos_y,
        ])
      );
    });

    maps[selected_room].clients.push(client);
  };

  //Socket stuff

  this.data = function (data) {
    //console.log("Client data: " + data.toString());
    packet.parse(client, data);
  };
  this.error = function (err) {
    if (err.code === "ECONNRESET") {
      console.log("Socket connection reset by client");
    } else {
      console.log("Socket error: " + err);
    }
  };
  this.close = function () {
    console.log("Client closed");
  };
};

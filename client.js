//Used to represent our client
var now = require("performance-now");

var _ = require("underscore");

module.exports = function () {
  //These objects will be added at runtime
  //this.socket={}
  //this.user={}

  this.initiate = () => {
    var client = this;
    //Send the connection handshake packet to the client
    client.socket.write(packet.build(["HELLO", now().toString()]));
    console.log("Client initiated");
    //console.log(packet.build(["HELLO", now().toString()]));
    
    
  };
  this.data = function (data) {
    console.log("Client data: " + data.toString());
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

//Used to represent our client
var now = require("performance-now");

var _ = require("underscore");

module.exports = function () {
  //These objects will be added at runtime
  //this.socket={}
  //this.user={}

  this.initiate = () => {
    //Do some stuff
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

//Import required Libraries
require(__dirname + "/Resources/config.js");
var fs = require("fs");
var net = require("net");

//Load the initializers
var init_files = fs.readdirSync(__dirname + "/Initializers");
init_files.forEach(function (initFile) {
  console.log("Loading Initializer: " + initFile);
  require(__dirname + "/Initializers/" + initFile);
});

//Load the models
var model_files = fs.readdirSync(__dirname + "/Models");
model_files.forEach(function (modelFile) {
  console.log("Loading Model: " + modelFile);
  require(__dirname + "/Models/" + modelFile);
});

//Load model_files maps
maps = {};
var map_files = fs.readdirSync(config.data_paths.maps);
map_files.forEach(function (mapFile) {
  console.log("Loading Map: " + mapFile);
  var map = require(config.data_paths.maps + mapFile);
  maps[map.room] = map;
});
//console.log(maps);

net
  .createServer(function (socket) {
    console.log("Socket connected");
    var c_inst = new require("./client.js");
    var thisClient = new c_inst();

    thisClient.socket = socket;
    thisClient.initiate();

    socket.on("error", thisClient.error);

    socket.on("close", thisClient.close);

    socket.on("data", thisClient.data);
  })
  .listen(config.port);

console.log(
  "Initialize Completed, Server running on port: " +
    config.port +
    " for environment: " +
    config.environment
);
//Console
// console.log(
//   "Initialize Completed, Server running on port: " +
//     config.port +
//     " for environment: " +
//     config.environment
// );

//console.log(config.database);

//1. Load the initalizers
//2. Load data models
//3. Load game maps data
//4. Initiate the server and listen to the internets
//All of server logic

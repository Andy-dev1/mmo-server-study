//Import required libraries
var args = require("minimist")(process.argv.slice(2));
var extend = require("extend");


//Store the enviroment variable
var enviroment = args.env || "test";

//Common config...
var common_conf = {
  name: "mmo game server test",
  version: "0.0.1",
  environment: enviroment,
  max_players: 100,
  data_paths: {
    items: __dirname + "\\Game Data\\" + "Items\\",
    maps: __dirname + "\\Game Data\\" + "Maps\\",
  },
  starting_zone: "rm_map_home",
};

//--env="production" --ip=0.0.0.0
//Environment Specific Configuration
var conf = {
  production: {
    ip: args.ip || "0.0.0.0",
    port: args.port || 8081,
    database: "mongodb://127.0.0.1/mmo_prod"
  },
  test: {
    ip: args.ip || "0.0.0.0",
    port: args.port || 8082,
    database: "mongodb://127.0.0.1/mmo_test"
  },
  // alphatest:{

  // }
};
extend(false,conf.production,common_conf);
extend(false,conf.test,common_conf);

module.exports = config = conf[enviroment];

//console.log(enviroment);

//node_server.js --env="test";

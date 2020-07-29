var MongoModule = require('mongodb').MongoClient;
 
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'siteG10';
 
function dbConnection(){
 this._MongoClient = undefined;
 this._MongoDB = undefined;
}
 
dbConnection.prototype.connectToMongo = function(callback){
 
  MongoModule.connect(url, function(err, client) {
  console.log("Server Conectado Com Sucesso!");
  var MongoClient = client;
  var MongoDB = client.db(dbName);
  
  return callback(MongoClient, MongoDB);
  });
 
}
 
module.exports = function(){
 return dbConnection;
}
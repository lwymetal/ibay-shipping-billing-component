var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "ibay",
  timeout: 60000
});

connection.connect(function(err) {
  if (err) {
    throw err;
  }
  console.log("Connected to DB");
});

module.exports = connection;
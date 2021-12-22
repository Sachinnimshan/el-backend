const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

var CONN = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

CONN.connect(function(error){
  if(error) {
    console.log(error);
  }
  else {
    console.log("connected to database");
  }
});

module.exports = CONN;
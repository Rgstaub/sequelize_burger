const mysql = require('mysql');

// Connection to the mySql database
let db;

if (process.env.JAWSDB_URL) {
  db = mysql.createConnection(process.env.JAWSDB_URL)
} else db = mysql.createConnection({
    multipleStatements: true,
    host: "localhost",
    user: "root",
    password: "root",
    database: "burger_db"
})

db.connect(err => {
  if (err) throw err;
  console.log(`Successfull connection to the database`);
})

// Export the configuration to connect to the database
module.exports = db;
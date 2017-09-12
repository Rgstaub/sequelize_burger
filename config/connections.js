const Sequelize = require('sequelize');
let env = process.env.NODE || 'development';
const config = require('./config.json')[env];



if (config.use_env_variable) {
  let sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;

// const mysql = require('mysql');

// // Connection to the mySql database
// let db;

// if (process.env.JAWSDB_URL) {
//   db = mysql.createConnection(process.env.JAWSDB_URL)
// } else db = mysql.createConnection({
//     multipleStatements: true,
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "burger_db"
// })

// db.connect(err => {
//   if (err) throw err;
//   console.log(`Successfull connection to the database`);
// })

// // Export the configuration to connect to the database
// module.exports = db;
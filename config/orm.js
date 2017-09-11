"use strict"

// Connect to the database
const db = require("./connections.js");

//=====================| ORM |==========================

let orm = {
  // return all of the burgers
  selectAll: (cb) => {
    let selectStr = "SELECT * FROM burgers"
    db.query(selectStr, (err, res) => {
      if (err) throw err;
      cb(res);
    })
  },
  // Add a new burger to the database and return the id
  insertOne: (burger) => {
    // Make an array of the keys of the burger object
    let burgerKeys = Object.keys(burger);
    // Create the parameter string for the mySQL query
    let burgerValues = [];
    burgerKeys.forEach((key) => {
      if (burger[key] === 'true') burgerValues.push(true);
      else burgerValues.push(burger[key]);
    })
    let insertStr = "INSERT INTO burgers (??) VALUES (?);"
    db.query(insertStr, [burgerKeys, burgerValues], (err, res) => {
      if (err) throw err;
    })
  },
  // Change a burger from uneaten to eaten
  updateOne: (id) => {
    let updateStr = "UPDATE burgers SET devoured=true WHERE id=?";
    db.query(updateStr, id, (err, res) => {
      if (err) throw err;
    })
  },
  // Reverts the database to its default data set
  refreshAll: () => {
    let refreshStr = `
      DROP TABLE IF EXISTS burgers;
      CREATE TABLE burgers (
        id INT(10) NOT NULL AUTO_INCREMENT,
        date TIMESTAMP,
        devoured BOOLEAN DEFAULT false,
        burger_name VARCHAR(128) DEFAULT "Anonymous",
        bun VARCHAR(128) NOT NULL DEFAULT "Sesame Seed",
        patty VARCHAR(128) DEFAULT "Beef",
        pickles BOOLEAN DEFAULT false,
        ketchup BOOLEAN DEFAULT false,
        mustard BOOLEAN DEFAULT false,
        onions BOOLEAN DEFAULT false,
        cheese BOOLEAN DEFAULT false,
        tomato BOOLEAN DEFAULT false,
        bacon BOOLEAN DEFAULT false,
        lettuce BOOLEAN DEFAULT false,
        special VARCHAR(128),
        PRIMARY KEY(id)
      );  
      INSERT INTO burgers (burger_name, bun, patty, pickles, ketchup, mustard, onions, cheese, tomato, bacon, lettuce, special) VALUES
        ('Classic Cheesburger', "Sesame-Seed", "Beef", true, true, true, true, true, true, false, true, null),
        ('Bacon Cheesburger', "Brioche", "Beef", true, true, true, true, true, true, true, true, null),
        ('Turkey Burger', "Whole Wheat", "Turkey", true, false, true, true, false, true, false, true, null),
        ('Bacon Avacado Burger', "Whole Wheat", "Beef", false, false, true, true, false, true, true, false, "Avacado"),
        ('Mushroom Swiss Burger', "Brioche", "Beef", false, false, false, true, true, false, false, false, "Mushrooms"),
        ('Hawaiian Burger', "Sesame-Seed", "Beef", false, true, true, true, true, false, true, false, "Pineapple"),
        ('Veggie Burger', "Whole Wheat", "Veggie", false, true, true, true, true, true, false, true, null);`;
    db.query(refreshStr, (err, res) => {
      if (err) throw err;
    })
  },
  // Deletes all devoured burgers
  clearDevoured: () => {
    let deleteStr = "DELETE FROM burgers WHERE devoured=true;"
    db.query(deleteStr, (err, res) => {
      if (err) throw err;
    })
  },

  filteredSelect: (columns, values, cb) => {
    let filterStr = filterBuilder(columns, values);
    db.query(filterStr, (err, res) => {
      if (err) throw err;
      console.log(res);
      cb(res);
    })
  }
}

//=============== Functions ==================

let filterBuilder = (cols, vals) => {
  let query = "SELECT * FROM burgers WHERE ";
  for (let i = 0; i < cols.length; i++) {
    if (vals[i] !== 'No Selection') {
      if (i === 0 || query === "SELECT * FROM burgers WHERE ") { 
        if (vals[i] === 'true') {
          var subStr = `${cols[i]}=${1} `;
        } else {
          var subStr = `${cols[i]}='${vals[i]}' `
        }
      }
      else {
        console.log(vals[i]);
        if (vals[i] === 'true') {
          console.log("DING");
          var subStr = `AND ${cols[i]}=${1} `;
        } else {
          var subStr = `AND ${cols[i]}='${vals[i]}' `
        }
      }
      query += subStr;
    }
  }
  query += ";";
  console.log(query);
  return query;
}

// Ship it
module.exports = orm;
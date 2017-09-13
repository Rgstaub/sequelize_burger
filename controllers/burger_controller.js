"use strict"

// Create the router
// const express = require('express');
// const router = express.Router();

// Import the Burger constructor
// const burgers = require('../models/burger.js')
const db = require('../models');

//=========================== Routes ==================================

module.exports = (app) => {
  app.get('/', (req, res) => {
    // Get all the burger data
    db.burger.findAll({}).then((data) => {
    //burgers.getAll(response => {
      // divide it into devoured and not devoured arrays
      let sortedBurgers = seperateEaten(data);
      // Send it to handlebars to render
      res.render('index', sortedBurgers);

    })
  })

  app.get('/ingredients', (req, res) => {
    db.burger.findAll({}).then( response => {
      res.send(response);
    })
  })

  app.post('/filter', (req, res) => {
    let filters = req.body;
    if (filters. patty === 'No Selection') {
      delete filters.patty;
    }
    if (filters.bun === 'No Selection') {
      delete filters.bun;
    }
    console.log(filters);
    db.burger.findAll({
      where: filters
    }).then( results => {
      let sortedBurgers = seperateEaten(results);
      res.render('index', sortedBurgers);
    })
    // let values = [];
    // let keys = Object.keys(req.body);
    // keys.forEach(key => {
    //   values.push(req.body[key]);
    // })
    // console.log(keys);
    // console.log(values);
    // db.burger.findAll({
    //   where: {
    //     keys[2]: values[2]
    //   }
    // })
    // burgers.getSome(keys, values, response => {
    //   let sortedBurgers = seperateEaten(response);
    //   res.render('index', sortedBurgers);
    // })
  })

  app.post('/', (req, res) => {
    // Create a new burger using the new Burger name
    db.burger.create(req.body);
    // Redirect to home to re-render the page
    res.redirect("/");
  })

  // 'Devour' a burger of a given input
  app.post('/_put/:id', (req, res) => {
    db.burger.update({
      devoured: true
    },
    {
      where: {
        id: req.params.id
      }
    }).then(() => {
      res.status(201).end();
    })
  })

  // Reset all the burger values to the default
  app.post('/refresh', (req, res) => {
    burgers.refreshAll();
    res.status(201);
  })

  // Delete all rows where devoured=true
  app.post('/clear', (req, res) => {
    db.burger.destroy({
      where: {
        devoured: true
      }
    }).then(() => {
      res.status(201).end();
    })
  })
}


//========================= Functions ============================

// Get the results of a query and divide it into arrays by 'devoured' status
// for display in the DOM
let seperateEaten = (burgers) => {
  // divide it into devoured and not devoured arrays
  let available = [];
  let unavailable = [];
  burgers.forEach(burger => {
    if (burger.devoured) unavailable.push(burger);
    else available.push(burger);
  })
  let burgerObj = {'uneaten': available, 'eaten': unavailable};
  return burgerObj;
}
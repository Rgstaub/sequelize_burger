"use strict"

// Import the sequelize models
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
    // Remove optional patty and bun filters
    if (filters. patty === 'No Selection') {
      delete filters.patty;
    }
    if (filters.bun === 'No Selection') {
      delete filters.bun;
    }
    // Convert any "true" values from string to boolean
    let keys = Object.keys(filters);
    keys.forEach(key => {
      if (filters[key] === 'true') {
        filters[key] = true;
      }
    })
    console.log(filters);
    db.burger.findAll({
      where: filters
    }).then( results => {
      let sortedBurgers = seperateEaten(results);
      res.render('index', sortedBurgers);
    }).finally()
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
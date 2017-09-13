"use strict"

// Set up the app
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static("public"));

// Load the Sequelize models
const db = require('./models');


// Load body parsing package
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Load the router
// const routes = require('./controllers/burger_controller.js')
// app.use("/", routes);
require('./controllers/burger_controller.js')(app);

// Set up handlebars
const exphbs = require('express-handlebars');
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Hey! Listen! (once the db syncs)
db.sequelize.sync().then( () => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  })
});
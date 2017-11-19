// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var expressHandleBars = require("express-handlebars");

// Models
var db = require("./models");

// Express
var app = express();
var PORT = process.env.PORT || 5050;

// Middleware
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// MongoDB, leverage ES6 Promises
mongoose.Promise = Promise;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper_db";
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

// Routes
// var routes = require('./controllers/scraper_controller.js');
// app.use('/', routes);
require("./routes/api-routes.js")(app);

// Start server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});

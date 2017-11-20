var express = require('express');
var router = express.Router();

// Import the models
var burger = require('../models/');

// Create routes and set up logic within those routes where required
router.get('/', function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burger: data
    };
    res.render('index', hbsObject);
  });
});

router.post('/api/burgers', function(req, res) {
  burger.insertOne([
    'burger_name', 'devoured'
  ], [
    req.body.name, 0
  ], function(result) {
    // Send back ID of the new burger
    res.json({ id: result.insertId });
  });
});

router.put('/api/burgers/:id', function(req, res) {
  var condition = 'id = ' + req.params.id;

  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js
module.exports = router;

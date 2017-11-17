var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {

  // Route for scraping
  app.get("/scrape", function(req, res) {
    axios.get("http://talkingpointsmemo.com/news").then(function(response) {
      
      var $ = cheerio.load(response.data);

      $(".CategoryTitle__Main .TypicalArticle").slice(0, 5).each(function(i, element) {
        
        var result = {};

        result.title = $(this)
          .find(".TypicalArticle__Title a")
          .text();

        result.link = $(this)
          .find(".TypicalArticle__Title a")
          .attr("href");

        result.image = $(this)
          .find(".TypicalArticle__Image img")
          .attr("src");

        result.content = $(this)
          .find(".TypicalArticle__Content p")
          .text();

        db.Article
          .create(result)
          .then(function(dbArticle) {
            res.send("Scrape Complete");
          })
          .catch(function(err) {
            res.json(err);
        });
      });
    });
  });

  // Route for all Articles
  app.get("/articles", function(req, res) {
    db.Article
      .find({})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // Route for Article by id, populate with note
  app.get("/articles/:id", function(req, res) {
    db.Article
      .findOne({ _id: req.params.id })
      .populate("note")
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // Route for saving Article's associated Note
  app.post("/articles/:id", function(req, res) {
    db.Note
      .create(req.body)
      .then(function(dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id }, {$push: { note: dbNote._id }}, { new: true });
      })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // Route for deleting all Articles
  app.get("/delete", function(req, res) {
    db.Article
      .remove()
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
    db.Note
      .remove()
      .then(function(dbNote) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

};

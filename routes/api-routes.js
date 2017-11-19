// Dependencies
var request = require("request");
var cheerio = require("cheerio");

var db = require("../models");

// Routes
module.exports = function(app) {

  // Route for scraping
  app.get("/scrape", function(req, res) {
    request("http://talkingpointsmemo.com/news", function(error, response, html) {
      
      var $ = cheerio.load(html);
      
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

        if (result.title && result.link) {
          db.Article
          .update(
            { title: result.title },
             {
                title: result.title,
                link: result.link,
                image: result.image,
                content: result.content,
                saved: false
             },
             { upsert: true },
          function(err, inserted) {
            if (err) {
              console.log(err);
            }
            else {
              console.log(inserted);
            }
          });
        }
      });
    });

    res.send("Scrape Complete");
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

  // Route for Article by id, populate with comment
  app.get("/articles/:id", function(req, res) {
    db.Article
      .findOne({ _id: req.params.id })
      .populate("comment")
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // Route for saving Article's associated comment
  app.post("/articles/:id", function(req, res) {
    db.comment
      .create(req.body)
      .then(function(dbComment) {
        // If a comment was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new comment
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id }, {$push: { comment: dbComment._id }}, { new: true });
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
    db.Comment
      .remove()
      .then(function(dbComment) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

};

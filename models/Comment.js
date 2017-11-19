var mongoose = require("mongoose");

// Save reference to Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
var CommentSchema = new Schema({
  title: String,
  body: String
});

// Creates model from above schema
var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;

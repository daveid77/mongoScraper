// Grab the articles as a json
$.getJSON("/articles", function(data) {
  if (data.length) {
    $("#articles").append('<h3>Talking Points Memo headlines:</h3>');
    for (var i = 0; i < data.length; i++) {
      var article = "<div class=\"article-wrapper\">";
      article += "<img src=\"" + data[i].image + "\">";
      article += "<h4 data-id='" + data[i]._id + "'>" + data[i].title + "</h4>";
      article += "<p>" + data[i].content + "</p>";
      article += "<a href=\"" + data[i].link + "\" target=\"_blank\">Read More</a>";
      article += "<div><button style=\"margin-top: -24px; float: right;\">Add to Saved Articles</button></div>";
      article += "</div>";
      $("#articles").append(article);
    }
  } else {
    $("#articles").append('<h3>There are no scraped articles yet :-(</h3>');
  }
});


$(document).on("click", "h4", function() {
  console.log('h4 click');
  $("#comments").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .done(function(data) {
      console.log(data);
      $("#comments").append("<h2>" + data.title + "</h2>");
      $("#comments").append("<input id='titleinput' name='title' >");
      $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
      $("#comments").append("<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>");

      // If there's a comment in the article
      if (data.comment) {
        $("#titleinput").val(data.comment.title);
        $("#bodyinput").val(data.comment.body);
      }
    });
});

// When you click the savecomment button
$(document).on("click", "#savecomment", function() {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from comment textarea
      body: $("#bodyinput").val()
    }
  })
    .done(function(data) {
      console.log(data);
      $("#comments").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});

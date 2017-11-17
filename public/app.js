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
      article += "</div>";
      $("#articles").append(article);
    }
  } else {
    $("#articles").append('<h3>There are no scraped articles yet :-(</h3>');
  }
});


$(document).on("click", "h4", function() {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .done(function(data) {
      console.log(data);
      $("#notes").append("<h2>" + data.title + "</h2>");
      $("#notes").append("<input id='titleinput' name='title' >");
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    .done(function(data) {
      console.log(data);
      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});

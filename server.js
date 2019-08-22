var connection = require("./connection");
var express = require("express");
var exphbs = require("express-handlebars");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
  connection.query("SELECT * FROM notes;", function(err, data) {
    if (err) {
      throw err;
    }
    res.render("index", { notes: data });
  });
});

app.post("/", function(req, res) {
  connection.query(
    "INSERT INTO notes (title,body) VALUES (?,?)",
    [req.body.title, req.body.body],
    function(err, res) {
      if (err) {
        throw err;
      }
      // res.render("index");
    }
  );
});

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});

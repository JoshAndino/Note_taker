var mysql = require("mysql");
var connection = require("./connection");
var express = require("express");
var exphbs = require("express-handlebars");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "notetaker_db"
  });

  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
  
    console.log("connected as id " + connection.threadId);
  });

  app.get("/", function(req, res) {
    connection.query("SELECT * FROM notes;", function(err, data) {
      if (err) {
        throw err;
      }
      res.render("index", {notes: data });
  });
});

app.post("/new", function(req, res) {
    connection.query("INSERT INTO notes (title,body) VALUES (?,?)", [req.body.title,req.body.text], function(err, result) {
        if (err) {
          throw err;
        }
         function newValue(){
    
         }
    
        res.redirect("/");
      });
    });
    
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});
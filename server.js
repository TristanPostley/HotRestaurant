// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('assets'));

// =============================================================
const tables = 
[
    {
        name : "Billy",
        PhoneNumber : "12",
        Email : "Billy@Blob.com",
        UID : 1111
    }
]

const waitlist = 
[

]

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
  
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
  app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });

  app.get("/api/tables", function(req, res) {
    res.json(tables);
  });

  app.get("/api/waitlist", function(req, res) {
    res.json(waitlist);
  });
  
  app.get("/reservation", function(req, res) {
    res.sendFile(path.join(__dirname, "reservation.html"));
  });  
  
  app.post("/api/reservation", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newTable = req.body;

    if(tables.length < 5) {
        tables.push(newTable);
        res.send(true);
    }
    else {
        waitlist.push(newTable);
        res.send(false);
    }
  });

  app.post("/api/clear", function(req, res){
      tables.length = 0;
      waitlist.length = 0;
  })
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
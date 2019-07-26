// server.js - where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/timestamp/", function (req, res) {
  let date = new Date();
  res.json({"unix": date.getTime(), "utc" : date.toUTCString() });
});

// your first API endpoint... 
app.get(/\/api\/timestamp\/.+/, function (req, res) {
  let response = {"unix": null, "utc" : "Invalid Date" };   
  
  let dateStr = function(path){
    return /api\/timestamp\/(.*)/.exec(path)
  }(req.path)[1];
  
  let isValidDate = function(str) {
    return new Date(dateStr).toString() !== "Invalid Date";
  }(dateStr);
  
  let isUnix = function(str){
    return /^-?[0-9]+$/.test(str);
  }(dateStr);
  
  if(isUnix) {
    let unix = parseInt(dateStr);
    let date = new Date(unix);
    response = {"unix": date.getTime() * 1000, "utc" : date.toUTCString()};  
  }
  else if (isValidDate) {
    let date = new Date(dateStr);
    response = {"unix": date.getTime(), "utc" : date.toUTCString()};  
  }
  
  res.json(response);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
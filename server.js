var express = require('express');
var strftime = require('strftime');
var app = express();

// root, show welcome page / docs
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// Look for a time stamp parameter
app.get("/:ts", function (request, response) {
  //try to parse the parameter
  var data = {
    unix: null,
    natural: null,
  }
  var date = new Date(request.params.ts);

  if (date == "Invalid Date") {
    //it's not natural language, so try for unixtime
    date = new Date(parseInt(request.params.ts));
  }
  
  //still not valid? return error
  if (date == "Invalid Date")  return response.json(data);
       
  data.unix = date.getTime(),
  data.natural = strftime('%B %d, %Y', date)
  
  response.json(data);
});

// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
var express = require('express');
var strftime = require('strftime');
var app = express();
var moment = require('moment');

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
  var date_natural = null;
  // 3rd argument is true for strict parsing
  var date_unix = moment.utc(request.params.ts, "X", true);

  if (date_unix.isValid()) {
    data.natural = date_unix.format('MMMM D, YYYY');
    data.unix = date_unix.unix();
  }
  else {
    date_natural = moment.utc(request.params.ts, "MMMM D, YYYY", true);
    if ( date_natural.isValid() ) {
      data.natural = date_natural.format('MMMM D, YYYY');
      data.unix = date_natural.unix();
    }
  }

  response.json(data);
});

// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app; // for testing

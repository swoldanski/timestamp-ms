var url = require("url");
var path = require("path");
var express = require('express');

var app = express();

app.get('*', function(req, res) {
    const parsedURL = url.parse(req.url , true);
    console.log(parsedURL);
    // epoch found
    var date = Date(path.basename(parsedURL.path)) || Date.parse(path.basename(parsedURL.path));
    console.log(date);
    if (!isNaN(date)) res.send(date);
    
    // default response
    res.send('API Basejump: Timestamp microservice');
    //res.end()
});

app.listen(process.env.PORT, function() {
    console.log('Example app listening on port ', process.env.PORT);
});
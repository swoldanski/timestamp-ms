var url = require("url");
var path = require("path");
var express = require('express');
var querystring = require("querystring")

var app = express();

app.get('*', function(req, res) {

var response = `
<!doctype html>
<html lang="en">
    <head>
        <title>Timestamp microservice</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    </head>
    <body>
        <div class="container">
            <h1 class="header">
                API Basejump: Timestamp microservice
            </h1>
            <blockquote>
                User stories:
                <ul>1) I can pass a string as a parameter, and it will check to see whether that string 
                contains either a unix timestamp or a natural language date (example: January 1, 2016)</ul>
                <ul>2) If it does, it returns both the Unix timestamp and the natural language form of that date.</ul>
                <ul>3) If it does not contain a date or Unix timestamp, it returns null for those properties.</ul>
            </blockquote>
            <h3>Example usage:</h3>
            <code>https://timestamp-ms.herokuapp.com/December%2015,%202015</code><br>
            <code>https://timestamp-ms.herokuapp.com/1450137600</code>
            <h3>Example output:</h3>
            <code>
                {
                  "unix": 1450137600,
                  "natural": "December 15, 2015"
                }
            </code>
        </div>
    </body>
</html>`;
    
    var epochRegExp = new RegExp('[0-9]{10}', 'g');
    var date = new Date();
    
    const parsedURL = url.parse(req.url, true);
    
    
    // query string
    var inputToConvert = querystring.unescape(path.basename(parsedURL.path));

    // if no query to parse, skip, return info
    if (inputToConvert.length > 0) {
        // if we cant parse date return nulls
        response = {
            "unix": null,
            "natural": null
        };
        
        //time in human form as input?
        var timeToReturn = Date.parse(inputToConvert);

        // if not maybe epoch?
        if (isNaN(timeToReturn) ) {
            var matchFound = inputToConvert.match(epochRegExp);
            if (matchFound !== null && matchFound.length === 1 && matchFound[0].length === inputToConvert.length)  timeToReturn = parseInt(inputToConvert) * 1000;
        }

        // do we have something to parse
        if (!isNaN(timeToReturn)) {
            date.setTime(timeToReturn);

            response = {
                "unix": date.getTime() / 1000,
                "natural": date.toDateString()
            };
        }

    }
    // default response
    // res.send();
    res.send(response);
});

app.listen(process.env.PORT, function() {
    console.log('Example app listening on port ', process.env.PORT);
});
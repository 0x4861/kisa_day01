var express = require('express')
var app = express();
var request = require('request');
//xml parser npm module name :xml2js
var parser = require("xml2js");

function weather(callback){
    request('http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnld=109',
     function (error, response, body) {
        parser.parseString(body, function (err, jsonData) {
            console.log(body);
            console.log(jsonData);
            callback(jsonData.rss.channel[0].item[0].description[0].header[0].wf[0]);    
        })
    });
}


app.get('/weather', function (req, res) {
    weather(function(data){
        res.send(data);
    })
});


app.get('/', function (req, res) {
    request('http://www.naver.com', function (error, response, body) {
      console.log('body:', body); // Print the HTML for the Google homepage.
      res.send(body);
    });
});

app.get('/home', function (req, res) {
    res.send('home');
})

app.get('/about', function (req, res) {
    res.send('about');
})
 
app.listen(3000)

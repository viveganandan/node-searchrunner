const express = require('express');
const search = require('./search');
const responseTime = require('response-time');
const port  = process.env.PORT || 8000;

// Capture response time
var addResponseTime = require('response-time')();

// Express client
var app = express();

// Add respone time middleware
app.use(addResponseTime);

app.get('/flights/search', (req, res) => {
    search.searchAllProviders().then((results) => {
        res.json(results);
    }, (err) => {
        res.status(400).json({results:[], err});
    });

});
app.listen(port);

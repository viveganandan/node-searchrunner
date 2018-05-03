const express = require('express');
const search = require('./search');
const Promise = require('bluebird');
const redis = Promise.promisifyAll(require('redis'));
const responseTime = require('response-time');
const port  = process.env.PORT || 8000;
const redisHost = process.env.REDIS_HOST || '127.0.0.1';

// Redis client
var client = redis.createClient(6379, redisHost);
client.on('error', function (err) {
    console.log(`Redis client: ${err}`);
});

// Capture response time
var addResponseTime = require('response-time')();

// Express client
var app = express();

// Add respone time middleware
app.use(addResponseTime);

app.get('/flights/search', (req, res) => {
    // Check cache first
    client.getAsync('resultscache').then((results) => {
        if (results) {
            res.json(JSON.parse(results));
        } else {
            search.searchAllProviders(req.id).then((results) => {
                // Hold onto results for 60 seconds
                client.setexAsync('resultscache', 60, JSON.stringify(results));
                res.json(results);
            }, (err) => {
                res.status(400).json({err});
            });
        }
    });
});
app.listen(port);

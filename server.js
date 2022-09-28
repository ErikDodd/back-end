'use strict';
// This will be our server


// Set Up
// -------------

require('dotenv').config();
// Express Server
const express = require('express');
// Allows for Cross Origin Resource Sharing
const cors = require('cors');
// load data
const weather = require('./data/weather.json');
const { findSourceMap } = require('module');
// start our server
const app = express();

// Middleware
// The app.use() function is used to mount the specified middleware functions(s) at the path which is being specified 
app.use(cors());

// Declare our PORT Variable
const PORT = process.env.PORT || 3001;

// Listening for Connection
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

// Class 
class Forecast {
    constructor(date, description) {
    this.date = date;
    this.description = description;
    }
}
// Declare Endpoints
// -----------------

app.get('/', (req, res) => {
    res.send('Hello from the home route!');
});

app.get('/weather', (req, res) => {
    const cityName = req.query.searchQuery
    // const lat = req.query.lat
    // const lon = req.query.lon
    console.log(cityName);
    const cityResult = weather.find(city => city.city_name === cityName)
    // console.log(req.query);
    const forecastArr = cityResult.data.map(e => new Forecast(e.datetime, e.weather.description));
    res.send(forecastArr);
});


// data.find(lat => )



// // app.get('/supplies', (req, res) => {
// //     res.send(data.lists[1].items);
// // });

// // app.get('/food', (req, res) => {
// //     res.send(data.lists[1].items);
// // });

// Catch all endpoint:

// app.get('*', (req, res) => {
//     res.status(404).send('Page Not Found');
// });


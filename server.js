'use strict';
// This will be our server


// Set Up
// -------------

require('dotenv').config();
// Express Server
const express = require('express');
// Allows for Cross Origin Resource Sharing
const cors = require('cors');
// Install Axios
const axios = require('axios');
// load data
const weather = require('./data/weather.json');
const { findSourceMap } = require('module');
const { response } = require('express');
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


// Catch all endpoint:
app.get('*', notFound);

function notFound(req, res) {
    response.status(404).send('Error Not Found');
}

// Problem Solving
// 1. check that server is running
// 2. in frontend, check the network tab
// 3. in the backend visit the url || thunder client GET request
// = should see json data from the API

// Demo Code from 9/28
// app.get('/photos', getPhotos);
// async function getPhotos(req, res) {
//  const searchQuery = req.query.searchQuery;
//  const url = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${searchQuery}`;

//  try {
//      const photoResponse = await axios.get(url);
//      const photoArray = photoResponse.data.results.map(photo => new Photo(photo));
//      res.status(200).send(photoArray);
// } catch (error) {
    // console.log('error message is: ', error);
    // response.status(500).send(`server error ${error}`);
    // }
// }

// class Photo {
//     constructor(obj) {
//      this.img_url = obj.urls.regular;
//      this.photographer = obj.user.name;
//  }
// }
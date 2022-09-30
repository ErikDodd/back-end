'use strict';

// Set Up
// -------------

require('dotenv').config();
// Express Server
const express = require('express');
// Allows for Cross Origin Resource Sharing
const cors = require('cors');

// start our server
const app = express();

// put relative filepath with ./ at the beginning
const getWeatherInfo = require('./modules/getWeatherInfo.js');
const getMovieInfo = require('./modules/getMovieInfo.js');

// Middleware
app.use(cors());

// Declare our PORT Variable
const PORT = process.env.PORT || 3001;

// Listening for Connection
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

// Declare Endpoints

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/weather', getWeatherInfo);

app.get('/movies', getMovieInfo);

// Catch all endpoint:
app.get('*', notFound);

function notFound(req, res) {
  res.status(404).send('Error Not Found');
}

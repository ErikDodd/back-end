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
// const weather = require('./data/weather.json');
const { response } = require('express');
// start our server
const app = express();

// put relative filepath with ./ at the beginning
// const getWeatherInfo = require('./modules/getWeatherInfo.js');
// const getMovieInfo = require('./modules/getWeatherInfo.js');

// Middleware
// The app.use() function is used to mount the specified middleware functions(s) at the path which is being specified 
app.use(cors());

// Declare our PORT Variable
const PORT = process.env.PORT || 3001;

// Listening for Connection
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

// Class Constructors
class Forecast {
    constructor(description, datetime, temp) {
    this.description = description;
    this.datetime = datetime;
    this.temp = temp;
    }
}

class Movie {
    constructor(title, overview, vote_average, vote_count, poster_path, popularity, release_date) {
        this.title = title;
        this.overview = overview;
        this.vote_average = vote_average;
        this.vote_count = vote_count;
        this.poster_path = poster_path;
        this.popularity = popularity;
        this.release_date = release_date;
    }
}

// Declare Endpoints

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.get('/weather', getWeatherInfo);

async function getWeatherInfo(req, res) {
    const searchQuery = req.query.searchQuery;
    const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&city=${searchQuery}&key=${process.env.WEATHER_API_KEY}`;
    try {
        const weatherResponse = await axios.get(weatherUrl);
        const weatherArray = weatherResponse.data.data.map(e => new Forecast(e.description, e.datetime, e.temp));
        res.status(200).send(weatherArray);
    } catch {
        response.status(500).send(`Server Error`);
    }
}

app.get('/movies', getMovieInfo);

async function getMovieInfo(req, res) {
    const searchQuery = req.query.searchQuery;
    const movieUrl = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${process.env.MOVIE_API_KEY}`;
    try {
        const movieResponse = await axios.get(movieUrl);
        const movieArray = movieResponse.data.results.map(e => new Movie(e.title, e.overview, e.vote_average, e.vote_count, e.poster_path, e.popularity, e.release_date));
        res.status(200).send(movieArray);
    } catch {
        response.status(500).send(`Server Error`);
    }
}


// Catch all endpoint:
app.get('*', notFound);

function notFound(req, res) {
    res.status(404).send('Error Not Found');
}

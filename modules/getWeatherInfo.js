'use strict';

const axios = require('axios');


// This is kept private and not shared with server.js
class Forecast {
    constructor(description, datetime, temp) {
        this.description = description;
        this.datetime = datetime;
        this.temp = temp;
    }
}
async function getWeatherInfo(req, res) {
    const searchQuery = req.query.searchQuery;
    const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&city=${searchQuery}&key=${process.env.WEATHER_API_KEY}`
    try {
        const weatherResponse = await axios.get(weatherUrl);
        const weatherArray = weatherResponse.data.data.map(e => new Forecast(e.description, e.datetime, e.temp));
        res.status(200).send(weatherArray);
    } catch {
        response.status(500).send(`Server Error`);
    }
}


// node export syntax:
module.exports = getWeatherInfo;

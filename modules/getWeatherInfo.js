'use strict';

const axios = require('axios');

const cache = require('./cache.js');


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
  const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&city=${searchQuery}&key=${process.env.WEATHER_API_KEY}`;
  try {
    const key = searchQuery + 'weather';
    // if the key exists in cache AND is valid, then send that date from cache
    if (cache[key] && (Date.now() - cache[key].timeStamp < 3600000)) {
      console.log('Cache was hit, data present');
      res.status(200).send(cache[key].data);
    } else {
      const weatherResponse = await axios.get(weatherUrl);
      const weatherArray = weatherResponse.data.data.map(e => new Forecast(e.description, e.datetime, e.temp));
      // save to cache
      cache[key] = {
        timeStamp: Date.now(),
        data: weatherArray,
      };
      console.log('Cache is:', cache);
      res.status(200).send(weatherArray);
    }
  } catch(error){
    res.status(500).send('Server Error');
  }
}


// node export syntax:
module.exports = getWeatherInfo;

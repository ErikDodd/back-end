'use strict';

const axios = require('axios');

const cache = require('./cache.js');

class Movie {
  constructor(title, overview, vote_average, vote_count, poster_path, popularity, release_date, id) {
    this.title = title;
    this.overview = overview;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
    this.poster_path = poster_path;
    this.popularity = popularity;
    this.release_date = release_date;
    this.id = id;
  }
}

async function getMovieInfo(req, res) {
  const searchQuery = req.query.searchQuery;
  const movieUrl = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${process.env.MOVIE_API_KEY}`;
  try {
    const key = searchQuery + 'movie';
    if (cache[key] && (Date.now() - cache[key].timeStamp < 604800000)) {
      console.log('cache was hit, data present');
      res.status(200).send(cache[key].data);
    } else {
      const movieResponse = await axios.get(movieUrl);
      const movieArray = movieResponse.data.results.map(e => new Movie(e.title, e.overview, e.vote_average, e.vote_count, e.poster_path, e.popularity, e.release_date, e.id));
      cache[key] = {
        timeStamp: Date.now(),
        data: movieArray,
      };
      console.log('Cache is:', cache);
      res.status(200).send(movieArray);
    }
  } catch(error) {
    console.log(error, 'error');
    res.status(500).send('Server Error');
  }
}

// node export syntax:
module.exports = getMovieInfo;

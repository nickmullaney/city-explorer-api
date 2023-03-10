const axios = require('axios');
let cache = require('./cache.js')

function getMovies(req, res, next) {
  //send our weather data
  let movie = req.query.searchQuery;
  const key = 'movie-' + movie;
  const liveMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${movie}`;

  if(cache[key] && (Date.now() - cache[key].timestamp < 50000)){
    console.log('Movie Cache hit');
    res.status(200).send(cache[key].data);
  }else{
    console.log('Movie Cache Miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    axios.get(liveMovieUrl)
    .then(response => response.data.results.map(movie => new Movies(movie)))
    .then(formattedData => {
      cache[key].data = formattedData;
      res.status(200).send(formattedData)
    })
    .catch(error => next(error));
  }
}
//   axios.get(liveMovieUrl)
//   // Returns promise of array of movies
//     .then(response => response.data.results.map(movie => new Movies(movie)))
//     .then(formattedMovieArray => res.status(200).send(formattedMovieArray))
//     .catch(error => next(error));
// };

class Movies {
  constructor(movie) {
    this.title = movie.title,
      this.overview = movie.overview,
      this.average_votes = movie.vote_average,
      this.poster = movie.poster_path,
      this.popularity = movie.popularity,
      this.released_on = movie.release_date
  };
}

module.exports = {getMovies};


// let descriptions = response.data.results.map(movie => new Movies(movie));
// // Send out our descriptions data
// res.status(200).send(descriptions);

// Original Try Catch
      // try {
      //   // city is our new search query
      //   let movie = req.query.searchQuery;
      //   // this is our URL to take us to the live weather API
      //   let liveMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${movie}`
      //   console.log("Live Movie URL", liveMovieUrl)
      //   // response to get the live weather data
      //   let response = await axios.get(liveMovieUrl);
      //   console.log(response.data);
      //   // function to feed the weather data from the specific days into our Forcast Class
      //   let descriptions = response.data.results.map(movie => new Movies(movie));
      //   // Send out our descriptions data
      //   res.status(200).send(descriptions);
      // }
      // catch (error) {
      //   next(error);
      // }
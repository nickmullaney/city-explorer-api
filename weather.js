const axios = require('axios');

let cache = require('./cache.js');

//make a route to our data
function getWeather(req, res, next) {
  //send our weather data
  let city = req.query.searchQuery;
  const key = 'weather-'+ city;
  const liveWeatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.REACT_APP_WEATHER_API_KEY}&days=10`;

  if(cache[key] && (Date.now() - cache[key].timestamp < 50000)){
    console.log('Weather Cache hit');
    res.status(200).send(cache[key].data);
  } else {
    console.log('Weather Cache Miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    //because async it won't load in time to return cache data
    axios.get(liveWeatherUrl)
    .then(response => response.data.data.map(day => new Forecast(day)))
    // saves cache data in formatted data then sends it
    .then(formattedData => 
      {cache[key].data = formattedData;
      res.status(200).send(formattedData)
      })
    .catch(error => next(error));
  }
}

//   axios.get(liveWeatherUrl)
//   .then(response =>{
//     let descriptions = response.data.data.map(day=> new Forecast(day));
//     res.status(200).send(descriptions);
//   })
//   .catch(error => next(error));
// }
  class Forecast {
    constructor(city) {
    //takes in city data and breaks it into date and description to be used on the front end. 
    // This is the data we send to the front
    this.date = city.datetime;
    this.description = city.weather.description;
  };
}

module.exports = {getWeather};

// Original Try Catch

// try {
//   // city is our new search query
//   let city = req.query.searchQuery;
//   // this is our URL to take us to the live weather API
//   let liveWeatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.REACT_APP_WEATHER_API_KEY}&days=10`;
//   // response to get the live weather data
//   let response = axios.get(liveWeatherUrl);
//   console.log(response.data);
//   // function to feed the weather data from the specific days into our Forcast Class
//   let descriptions = response.data.data.map(day=> new Forecast(day));
//   // Send out our descriptions data
//   res.status(200).send(descriptions);
// }

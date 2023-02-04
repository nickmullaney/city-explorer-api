const axios = require('axios');

//make a route to our data
function getWeather(req, res, next) {
  //send our weather data
  let city = req.query.searchQuery;
  const liveWeatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.REACT_APP_WEATHER_API_KEY}&days=10`;

  axios.get(liveWeatherUrl)
  .then(response =>{
    let descriptions = response.data.data.map(day=> new Forecast(day));
    res.status(200).send(descriptions);
  })
  
  .catch(error => next(error));
  
  class Forecast {
    constructor(city) {
    //takes in city data and breaks it into date and description to be used on the front end. 
    // This is the data we send to the front
    this.date = city.datetime;
    this.description = city.weather.description;
  };
}

module.exports = getWeather;

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
};
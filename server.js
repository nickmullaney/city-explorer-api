'use strict';

const axios = require('axios');

//first install dotenv, cors, express with npm i _____
// const weatherData = require('./data/weather.json');

//.env library access
require('dotenv').config();

//express server library
const express = require('express');

// initialize express library
const app = express();

//Bringing in cors
const cors = require('cors');
// const { request } = require('http');

// anyone can make a request to our server
app.use(cors());

//access port
const PORT = process.env.PORT || 3002;

// default route
app.get('/', (request, response) => {
  response.send('Hey your default endpoint is working');
});

//this example if you type in localhost:3001/bananas it will display "this is bananas"
app.get('/bananas', (req, res) => {
  console.log('Hey Im here');
  res.send('This is bananas');
});

//make a route to our data
app.get('/weather', async(req, res, next) => {
  //send our weather data
 
  try {
    // city is our new search query
    let city = req.query.searchQuery;
    // this is our URL to take us to the live weather API
    let liveWeatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.REACT_APP_WEATHER_API_KEY}`;
    // response to get the live weather data
    let response = await axios.get(liveWeatherUrl);
    console.log(response.data);
    // function to feed the weather data from the specific days into our Forcast Class
    let descriptions = response.data.data.map(day=> new Forecast(day));
    // Send out our descriptions data
    res.status(200).send(descriptions);
  }
  catch (error) {
    next(error);
  }
});

app.get('/movies', async(req, res, next) => {
  //send our weather data
 
  try {
    // city is our new search query
    let city = req.query.searchQuery;
    // this is our URL to take us to the live weather API
    let liveMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${city}`
    
    // response to get the live weather data
    let response = await axios.get(liveMoviesUrl);
    console.log(response.data);
    // function to feed the weather data from the specific days into our Forcast Class
    let descriptions = response.data.data.map(day=> new Forecast(day));
    // Send out our descriptions data
    res.status(200).send(descriptions);
  }
  catch (error) {
    next(error);
  }
});

class Movies{
  constructor(city){
    this.
  }
}

class Forecast {
  constructor(city) {
    //takes in city data and breaks it into date and description to be used on the front end. 
    // This is the data we send to the front
    this.date = city.datetime;
    this.description = city.weather.description;
  }

  // Irrelevent
  getItems() {
    return this.city.data.map(items => {
      return { valid_date: items.valid_date, description: items.weather.description };
    });
  }
}
// Error response and log
app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).send(error);
});

// App will listen on whatever port we define
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

//  ***** When console logging it will show up in terminal not the browser console *****

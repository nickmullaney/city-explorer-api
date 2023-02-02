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

//make a route to data
app.get('/weather', async(req, res, next) => {
  //send our weather data
  // https://api.weatherbit.io/v2.0/current?city=seattle&key=df020ca95ee34ca48e6167d780b287b5
  try {
    let city = req.query.searchQuery;
    let liveWeatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.REACT_APP_WEATHER_API_KEY}`;
    let response = await axios.get(liveWeatherUrl);
    console.log(response.data);
    let descriptions = response.data.data.map(day=> new Forecast(day));
    res.status(200).send(descriptions);
  }
  catch (error) {
    next(error);
  }
});

class Forecast {
  constructor(city) {
    //trying to match city to search query
    this.date = city.datetime;
    this.description = city.weather.description;
  }

  // 
  getItems() {
    return this.city.data.map(items => {
      return { valid_date: items.valid_date, description: items.weather.description };
    });
  }
}

app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).send(error);
});

// App will listen on whatever port we define
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

//  ***** When console logging it will show up in terminal not the browser console *****

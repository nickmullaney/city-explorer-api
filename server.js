'use strict';

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
const getMovies = require('./movies');
const getWeather = require('./weather');
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
app.get('/weather', getWeather);

app.get('/movies', getMovies);

// Error response and log
app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).send(error);
});

// App will listen on whatever port we define
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

//  ***** When console logging it will show up in terminal not the browser console *****

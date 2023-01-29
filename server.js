'use strict';
//first install dotenv, cors, express with npm i _____

const weatherData = require('./data/weather.json');

//.env library access
require('dotenv').config();

//express server library
const express = require('express');

// initialize express library
const app = express();

//Bringing in cors
const cors = require('cors');
const { request } = require('http');

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
  console.log("Hey Im here");
  res.send('This is bananas')
});

//make a route to data
app.get('/weather', (req, res) => {
  //send our weather data
  res.send(weatherData);
});

// Sends back list based on query parameter `weather`
app.get('/weatherData', (req, res, next) => {
  try {
    let city = req.query.searchQuery;
    console.log("City = ", city);
    let myCity = new Forecast(city);
    let formattedList = myCity.getItems();
    res.status(200).send(formattedList);
  }
  catch (error) {
    next(error);
  }
});

class Forecast {
  constructor(city) {
    //trying to match city to search query
    let newCity = weatherData.find(list => list.city_name.toLowerCase() === city.toLowerCase());
    this.city = newCity;
  }

  // 
  getItems() {
    return this.city.data.map(items => {
      return {valid_date: items.valid_date, description: items.weather.description};
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

'use strict';
const axios = require('axios');
let cache = require('./cache.js');

function getYelpInfo(req, res, next) {
  // Option 2
  const city = req.query.searchQuery;
  const key = 'yelp-'+ city;
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
  }
  let yelpUrl = `https://api.yelp.com/v3/businesses/search?location=${city}`
  if(cache[key] && (Date.now() - cache[key].timestamp < 50000)){
    console.log('Yelp Cache hit');
    res.status(200).send(cache[key].data);
  } else {
    console.log('Yelp Cache Miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    //because async it won't load in time to return cache data
    axios.get(yelpUrl, config)
    .then(response => response.data.businesses.map(city => new Yelp(city)))
    // saves cache data in formatted data then sends it
    .then(formattedData => 
      {cache[key].data = formattedData;
      res.status(200).send(formattedData)
      })
    .catch(error => next(error));
  
    // old stuff
  // axios.get(yelpUrl, config)
  //   .then(response => res.status(200).send(response.data));
}
}
class Yelp{
  constructor(city){
    this.id = city.id;
    this.image_url = city.image_url;
    this.price = city.price;
    this.rating = city.rating;
    this.url = city.url; 
  }
}


module.exports = getYelpInfo;














//Option 1
//   const config = {
//     method: 'GET',
//     url: 'https://api.yelp.com/v3/businesses/search',
//     params:{
//       location: req.query.city,
//     },
//     headers:{
//       Authorization: `Bearer ${YELP_API_KEY}`
//     }
// }

// axios(config)
//   .then(response => res.status(200).send(response.data));

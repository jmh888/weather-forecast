const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
const axios = require('axios');
var fs = require('fs');
const csv = require('csv-parser');

const MAX_CITIES = 1000;
const FORECAST_API_BASE = "https://api.open-meteo.com/v1/forecast";
const API_TIMEOUT_SECONDS = 2;

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

app.get('/weather', (req, res) => {

  let latitude = req.query.latitude;
  let longitude = req.query.longitude; 

  if (!latitude || !longitude) {
    return res.send({});
  }

  const reqSettings = {
    method: 'GET',
    timeout: API_TIMEOUT_SECONDS * 1000,
    url: FORECAST_API_BASE,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Origin': '*',
    },
    params: {
      latitude,
      longitude,
      hourly:'temperature_2m,relativehumidity_2m,windspeed_10m,windgusts_10m,precipitation,rain,pressure_msl,surface_pressure',
      temperature_unit: 'fahrenheit',
      windspeed_unit: 'mph',
      precipitation_unit: 'inch',
    }
  };

  axios(reqSettings).then((response) => {
    let { data } = response;
    return res.send(data);
  })
  .catch(error => console.log(error));

});

app.get('/all-cities', async (req, res) => {
  let results = [];
  fs.createReadStream(__dirname + "/../data/uscities.csv")
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      return res.send(results.slice(0, MAX_CITIES).map(r => ({
        name: `${r.city}, ${r.state_name}`,
        latitude: r.lat,
        longitude: r.lng,
      })));
    });
})

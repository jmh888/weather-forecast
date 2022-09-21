const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
const axios = require('axios');

const FORECAST_API_BASE = "https://api.open-meteo.com/v1/forecast";
const API_TIMEOUT_SECONDS = 2;

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

app.get('/weather', (req, res) => {

  let latitude = req.query.latitude;
  let longitude = req.query.longitude; 

  const reqSettings = {
    method: 'GET',
    timeout: API_TIMEOUT_SECONDS * 1000,
    url: FORECAST_API_BASE,
    headers: {
      'Content-Type': 'application/json',
      // 'User-Agent': NestEndpoints.USER_AGENT_STRING,
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Origin': '*',
    },
    params: {
      latitude,
      longitude,
      hourly:'temperature_2m,relativehumidity_2m,windspeed_10m',
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

})

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11

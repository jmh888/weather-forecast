import React, { useEffect, useState } from 'react';
import './App.css';
import TemperatureTable from './components/TemperatureTable';
import axios from 'axios';

const CITY_OPTIONS = [
  {
    name: 'New York, NY',
    latitude: 52.52,
    longitude: 13.41,
  },
  {
    name: 'Los Angeles, CA',
    latitude: 34.05,
    longitude: -118.24,
  },
  {
    name: 'Phoenix, AZ',
    latitude: 33.45,
    longitude: -112.07,
  },
  {
    name: 'Philadelphia, PA',
    latitude: 39.95,
    longitude: -75.16,
  },
]

function App() {

  const [weatherInfoList, setWeatherInfoList] = useState([]);
  
  const [currentCityName, setCurrentCityName] = useState(CITY_OPTIONS[0].name);

  useEffect(() => {
    const city = CITY_OPTIONS.find(opt => opt.name == currentCityName);
    let url = `/weather?latitude=${city?.latitude}&longitude=${city?.longitude}`;
    axios.get(url).then((response) => {
      console.log('GET' + url + ' ---> received ' + response.data.hourly.temperature_2m.length + ' rows of data');
      setWeatherInfoList(response.data.hourly.time.map((timeStamp: string, i: number) => {
        return {
          timeStamp,
          temperature: response.data.hourly.temperature_2m[i] + ' ' + response.data.hourly_units.temperature_2m,
          humidity: response.data.hourly.relativehumidity_2m[i] + response.data.hourly_units.relativehumidity_2m,
          windSpeed: response.data.hourly.windspeed_10m[i] + ' ' + response.data.hourly_units.windspeed_10m,
        }
      }))
    });
  }, [currentCityName]);

  return (
    <div className="App">
      <header className="App-header">
        Test Weather App
      </header>

      <h2>Weather History for {CITY_OPTIONS.find(opt => opt.name == currentCityName)?.name}</h2>

      <label>Choose a city:</label>

      <select name="cities"
              id="cities"
              onChange = { (e) => { setCurrentCityName(e.target.value); } } >
        {
          CITY_OPTIONS.map((city, i) => 
            <option value={city.name} key={`city-name-${i}`}>{city.name}</option>
          )
        }
      </select> 

      {
        weatherInfoList.length > 0 && <TemperatureTable weatherInfoList={weatherInfoList}/>
      }
    </div>
  );
}

export default App;

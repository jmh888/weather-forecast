import React, { useEffect, useState } from 'react';
import './App.css';
import TemperatureTable from './components/TemperatureTable';
import axios from 'axios';
interface CityOption {
  name: string;
  latitude: any;
  longitude: any;
}

function App() {

  const [weatherInfoList, setWeatherInfoList] = useState([]);
  
  const [currentCityName, setCurrentCityName] = useState<string>();

  const [cityOptions, setCityOptions] = useState<Array<CityOption>>();

  useEffect(() => {

    if (!cityOptions) {
      axios.get('/all-cities').then((response) => {
        console.log('GET /all-cities');
        setCityOptions(response.data);
        setCurrentCityName(response.data[0].name)
      });
    }

    const city = cityOptions?.find(opt => opt.name == currentCityName);
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

      <h2>Weather History for {cityOptions?.find(opt => opt.name == currentCityName)?.name}</h2>

      <label>Choose a city: </label>

      <select name="cities"
              id="cities"
              onChange = { (e) => { setCurrentCityName(e.target.value); } }
              style={{marginBottom: '2rem'}}>
        {
          cityOptions &&
          cityOptions.map((city, i) => 
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

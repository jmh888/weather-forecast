import React, { useEffect, useState } from 'react';
import './App.css';
import { WeatherTable } from './stories/WeatherTable';
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getWeatherInfo } from './api/WeatherApi';
import { getAllCities } from './api/CitiesApi';
interface CityOption {
  name: string;
  latitude: any;
  longitude: any;
}

const queryClient = new QueryClient();

function WeatherApp() {
  const [selectedCity, setSelectedCity] = useState<string>();
  const [cityOptions, setCityOptions] = useState<Array<CityOption>>();
  useEffect(() => {
    if (!cityOptions) {
      getAllCities().then(data => {
        setCityOptions(data);
        setSelectedCity(data[0].name)
      })
    }
  })

  let weatherDataQuery = useQuery(["weatherData", selectedCity], async () => {
    const city = cityOptions?.find(opt => opt.name === selectedCity);
    return getWeatherInfo(city?.latitude, city?.longitude);
  },
  {
    enabled: cityOptions && cityOptions.length > 0,
    placeholderData: [...Array(50)].map((_, i) => {
      return {
        timeStamp: 'Loading...',
        temperature: 'Loading...',
        humidity: 'Loading...',
        windSpeed: 'Loading...',
      }
    }),
  });

  if (weatherDataQuery.error) {
    console.log('weatherDataQuery ERROR: ', weatherDataQuery.error);
  }

  return (
    <div className="App">
      <header className="App-header">
        Weather Forecasting App
      </header>

      {
        cityOptions && <h2>Forecast for {cityOptions?.find(opt => opt.name === selectedCity)?.name}</h2>
      }

      <label>Choose a city ({cityOptions?.length} available): </label>

      <select name="cities"
              id="cities"
              onChange = { (e) => {
                setSelectedCity(e.target.value);
                queryClient.invalidateQueries(['weatherData'])
              } }
              style={{marginBottom: '2rem'}}>
        {
          cityOptions &&
          cityOptions.map((city, i) => 
            <option value={city.name} key={`city-name-${i}`}>{city.name}</option>
          )
        }
      </select> 

      {
        !weatherDataQuery.isLoading && weatherDataQuery.data.length > 0 && <WeatherTable weatherInfoList={weatherDataQuery.data}/>
      }
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherApp />
    </QueryClientProvider>
  );
}

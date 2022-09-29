import React, { useEffect, useState } from 'react';
import './App.css';
import { WeatherTable } from './stories/WeatherTable';
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getWeatherInfo } from './api/WeatherApi';
import { getAllCities } from './api/CitiesApi';
import { Dropdown, Menu, Item, Trigger } from '@zendeskgarden/react-dropdowns';
import { Button } from '@zendeskgarden/react-buttons';
import { Code } from '@zendeskgarden/react-typography';
import { getSunriseSunset } from './api/SunriseSunsetApi';
import { CityInfo } from './interface/CityInfo';

const LOADING = '---';
const RANDOM = 'Random';
const SELECT_CITY = 'Select a City';
const queryClient = new QueryClient();

function WeatherApp() {
  const [selectedCity, setSelectedCity] = useState<string>();
  const [cityOptions, setCityOptions] = useState<Array<CityInfo>>();
  useEffect(() => {
    if (!cityOptions) {
      getAllCities().then(data => {
        setCityOptions(data);
        setSelectedCity(data[0].name)
      })
    }
  })

  const setRandomCity = () => {
    if (cityOptions) {
      let randomIndex = Math.floor(Math.random() * (cityOptions?.length - 1));
      setSelectedCity(cityOptions[randomIndex].name);
    }
  }

  let weatherDataQuery = useQuery(["weatherData", selectedCity], async () => {
    const city = cityOptions?.find(opt => opt.name === selectedCity);
    return getWeatherInfo(city?.latitude, city?.longitude);
  },
  {
    enabled: cityOptions && cityOptions.length > 0,
    placeholderData: [...Array(50)].map((_, i) => {
      return {
        timeStamp: LOADING,
        temperature: LOADING,
        humidity: LOADING,
        windSpeed: LOADING,
        windGusts: LOADING,
        rain: LOADING,
        pressureMsl: LOADING,
        surfacePressure: LOADING,
      }
    }),
  });

  let sunriseSunsetQuery = useQuery(["sunriseSunset", selectedCity], async () => {
    const city = cityOptions?.find(opt => opt.name === selectedCity);
    return getSunriseSunset(city?.latitude, city?.longitude);
  },
  {
    enabled: selectedCity !== undefined,
    placeholderData: {
      sunrise: '--:--:-- __',
      sunset: '--:--:-- __'
    }
  });

  if (weatherDataQuery.error) {
    console.error('weatherDataQuery ERROR: ', weatherDataQuery.error);
  }
  if (sunriseSunsetQuery.error) {
    console.error('sunriseSunsetQuery ERROR: ', sunriseSunsetQuery.error);
  }

  return (
    <div className="App">
      <header className="App-header">
        Weather Forecasting App
      </header>

      {
        cityOptions && 
        <div style={{margin: '0 0 2rem 0'}}>
          <h2>{cityOptions?.find(opt => opt.name === selectedCity)?.name}</h2>
          <Code>
            Latitude: {cityOptions?.find(opt => opt.name === selectedCity)?.latitude},
            Longitude: {cityOptions?.find(opt => opt.name === selectedCity)?.longitude}
          </Code>
          <p>Sunrise UTC: {sunriseSunsetQuery?.data?.sunrise}</p>
          <p>Sunset UTC: {sunriseSunsetQuery?.data?.sunset}</p>
        </div>
      }

      <Dropdown onSelect={value => setSelectedCity(value)}>
        <Trigger>
          <Button style={{marginBottom: '1rem'}}>{SELECT_CITY}</Button>
        </Trigger>
        <Menu placement="end" hasArrow>
          {
            cityOptions &&
            cityOptions.map((city, i) => 
              <Item value={city.name} key={`city-dropdown-option-${i}`}>{i+1}. {city.name}</Item>
            )
          }
        </Menu>
      </Dropdown>

      <div>
        <Button isNeutral style={{marginBottom: '1rem'}}
                onClick={() => { setRandomCity() }}>
          {RANDOM}
        </Button>
      </div>

      <div>
        {
          weatherDataQuery && !weatherDataQuery?.isLoading && weatherDataQuery?.data && weatherDataQuery?.data?.length > 0 &&
            <div>
              <WeatherTable
                caption={`Showing ${weatherDataQuery?.data[0].timeStamp} to ${weatherDataQuery?.data[weatherDataQuery?.data.length - 1].timeStamp}`}
                weatherInfoList={weatherDataQuery?.data}/>
            </div>
        }
      </div>
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

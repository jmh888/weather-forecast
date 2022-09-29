import React, { useEffect, useState } from 'react';
import './App.css';
import { WeatherTable } from './stories/WeatherTable';
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getWeatherInfo } from './api/WeatherApi';
import { getAllCities } from './api/CitiesApi';
import { Dropdown, Menu, Item, Trigger } from '@zendeskgarden/react-dropdowns';
import { Button } from '@zendeskgarden/react-buttons';

const LOADING = '---';
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

  if (weatherDataQuery.error) {
    console.log('weatherDataQuery ERROR: ', weatherDataQuery.error);
  }

  return (
    <div className="App">
      <header className="App-header">
        Weather Forecasting App
      </header>

      {
        cityOptions && <h2>{cityOptions?.find(opt => opt.name === selectedCity)?.name}</h2>
      }

      <Dropdown onSelect={value => setSelectedCity(value)}>
        <Trigger>
          <Button style={{marginBottom: '1rem'}}>Change City</Button>
        </Trigger>
        <Menu placement="end" hasArrow>
          {
            cityOptions &&
            cityOptions.map((city, i) => 
              <Item value={city.name}>{i+1}. {city.name}</Item>
            )
          }
        </Menu>
      </Dropdown>

      <div>
        {
          !weatherDataQuery.isLoading && weatherDataQuery.data.length > 0 &&
            <div>
              <WeatherTable
                caption={`Displaying ${weatherDataQuery.data[0].timeStamp} to ${weatherDataQuery.data[weatherDataQuery.data.length - 1].timeStamp}`}
                weatherInfoList={weatherDataQuery.data}/>
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

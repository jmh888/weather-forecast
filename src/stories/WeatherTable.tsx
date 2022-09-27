import React from 'react';

import './weathertable.css';

interface WeatherInfo {
  timeStamp: string;
  temperature: string;
  humidity: string;
  windSpeed: string;
}

interface WeatherTableProps {
  weatherInfoList: Array<WeatherInfo>;
}

export const WeatherTable = ({weatherInfoList}: WeatherTableProps) => {
  return (
    <div className="TempTable">
      <table style={{margin: 'auto'}}>
        <thead>
          <tr>
            <th>Time</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Wind Speed</th>
          </tr>
        </thead>

        <tbody>
          {
            weatherInfoList.map((item, i) => {
              return (
                <tr key={'weather-info-list' + i}>
                  <td>{new Date(item.timeStamp).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric"})}</td>
                  <td>{item.temperature}</td>
                  <td>{item.humidity}</td>
                  <td>{item.windSpeed}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

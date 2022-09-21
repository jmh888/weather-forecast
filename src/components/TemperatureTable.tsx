import React from 'react';
import '../styles/TemperatureTable.css';

interface WeatherInfo {
  timeStamp: string;
  temperature: string;
  humidity: string;
  windSpeed: string;
}

interface TemperatureTableProps {
  weatherInfoList: Array<WeatherInfo>;
}

function TemperatureTable({weatherInfoList}: TemperatureTableProps) {
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
}

export default TemperatureTable;

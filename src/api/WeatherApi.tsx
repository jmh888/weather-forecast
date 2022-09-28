import axios from 'axios';

export const getWeatherInfo = async (latitude: number, longitude: number) => {
  let url = `/weather?latitude=${latitude}&longitude=${longitude}`;

  let res = await axios.get(url);

  return res.data.hourly.time.map(
    (timeStamp: string, i: number) => 
      ({
        timeStamp,
        temperature: res.data.hourly.temperature_2m[i] + ' ' + res.data.hourly_units.temperature_2m,
        humidity: res.data.hourly.relativehumidity_2m[i] + res.data.hourly_units.relativehumidity_2m,
        windSpeed: res.data.hourly.windspeed_10m[i] + ' ' + res.data.hourly_units.windspeed_10m,
      })
  );
}

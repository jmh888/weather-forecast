import axios from 'axios';

interface SunriseSunsetGetResult {
  sunrise?: string;
  sunset?: string;
}

export const getSunriseSunset = async (latitude: number, longitude: number): Promise<SunriseSunsetGetResult> => {
  if (latitude === undefined || longitude === undefined) {
    return {};
  }
  
  let url = `/sunrise_sunset?latitude=${latitude}&longitude=${longitude}`;

  let res = await axios.get(url);

  let { sunrise, sunset } = res.data.results;

  return { sunrise, sunset };
}

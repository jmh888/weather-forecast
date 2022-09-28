import axios from 'axios';

export const getAllCities = async () => {
  let res = await axios.get('/all-cities');
  return res.data; 
}

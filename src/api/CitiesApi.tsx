import axios from 'axios';
import { CityInfo } from '../interface/CityInfo';

export const getAllCities = async (): Promise<Array<CityInfo>> => {
  let res = await axios.get('/all-cities');
  return res.data; 
}

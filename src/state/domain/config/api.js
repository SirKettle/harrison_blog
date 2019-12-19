import axios from 'axios';
import { prop } from 'ramda';

export const createApi = () => {
  return {
    getConfig: () => axios.get('config.json').then(prop('data')),
  }
};

import axios from 'axios';
import { prop } from 'ramda';

const TUMBLR_ID = 'hjthirkettle';
const TUMBLR_API_KEY = 'wZ76ugorKsu10IUwVRzRNT9KyyMkmJY6OV63wXsfHpBq4xIXIN';

export const createApi = () => {
  const api = axios.create({
    baseURL: 'https://api.tumblr.com/v2',
  });

  const baseParams = {
    api_key: TUMBLR_API_KEY,
  };

  return {
    getPosts: params =>
      api
        .get(`/blog/${TUMBLR_ID}/posts`, {
          params: {
            ...baseParams,
            ...params,
          },
        })
        .then(prop('data')),
  };
};

import axios from 'axios';
import queryString from 'query-string';
import { store } from '../redux/store';
import { API_URL } from '../configs/apiUrl';

const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    //'Access-Control-Request-Method': '*', 
    "Access-Control-Allow-Headers": "X-Requested-With"
  },

  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async config => {
  const url = API_URL;
  const token = await store.getState().auth.token;

  config.baseURL = url;
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response;
    }
    return response;
  },
  error => {
    console.log(error);
    throw error;
  },
);
export default axiosClient;

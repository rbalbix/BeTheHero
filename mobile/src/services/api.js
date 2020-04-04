import axios from 'axios';

// baseURL: 'http://192.168.1.107:3333';

const api = axios.create({
  baseURL: 'https://rb-behero.herokuapp.com'
});

export default api;

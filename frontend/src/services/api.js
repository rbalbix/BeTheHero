import axios from 'axios';

// baseURL: 'http://localhost:3333';

const api = axios.create({
  baseURL: 'https://rb-behero.herokuapp.com'
});

export default api;

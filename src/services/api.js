import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:3333',
  baseURL: 'http://test.cfarma.cc/api/',
});

export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/http://test.cfarma.cc/api/',
});

export default api;

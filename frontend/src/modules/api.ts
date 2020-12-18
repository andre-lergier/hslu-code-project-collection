import axios from 'axios';

export default axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:4433' : 'https://hslu-code-project-collection.herokuapp.com/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

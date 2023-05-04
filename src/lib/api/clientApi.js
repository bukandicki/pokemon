import axios from 'axios';

export const clientApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  headers: {
    'Content-Type': 'application/json'
  }
});

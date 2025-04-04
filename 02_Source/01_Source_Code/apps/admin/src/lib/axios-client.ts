import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_GATEWAY_URL ?? 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosClient = client;

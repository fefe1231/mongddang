import axios from 'axios';
// import { PreferencesUser } from './user';
// import { PreferencesUser } from './user';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청에 자동으로 accessToken 추가
api.interceptors.request.use(async (config) => {
  // const accessToken = localStorage.getItem('accessToken');
  const accessToken = `eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InF1c3RqZG5qc0BuYXZlci5jb20iLCJyb2xlIjoiY2hpbGQiLCJpZCI6MSwiaWF0IjoxNzMwNjQ1MjkxLCJleHAiOjQ4ODQyNDUyOTF9.Et9n4VbL5WmTX39kgHZw8AYbV5mkojfPVicNCEI09Rk`;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

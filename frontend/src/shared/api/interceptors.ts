import axios from 'axios';
import { PreferencesUser } from './user';
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
  const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImdrZG1mMXF1ZkBnbWFpbC5jb20iLCJyb2xlIjoiY2hpbGQiLCJpZCI6MTIsImlhdCI6MTczMTQyNjU4OSwiZXhwIjo0ODg1MDI2NTg5fQ.I9h7fQl98o1smGgJqMjDY7ev_O_5NAZ1Xrv22UUsx_Y';

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

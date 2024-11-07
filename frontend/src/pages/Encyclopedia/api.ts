import axios from 'axios';
import { ICharacterInfo } from './types';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 회원정보 조회
export const getCharacterInfo = (accessToken: string) => {
  return api.get<ICharacterInfo>('/api/game/collection/mongddang', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// 보유 코인 조회
export const getCoinInfo = (accessToken: string) => {
  return api.get('/api/game/coin', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
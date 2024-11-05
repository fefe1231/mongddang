import axios from 'axios';
import { IAchievement, ItitleInfo } from './types';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const getTitleInfo = (accessToken: string) => {
  return api.get<ItitleInfo>('/api/game/collection/achievement', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getTitleAchievement = (
  accessToken: string,
  achievementId: number
) => {
  const data = {
    achievementId,
  };

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.post<IAchievement>(
    '/api/game/collection/achievement/claim',
    data,
    options
  );
};

export const getTitleMain = (accessToken: string, titleId: number) => {
  const data = {
    titleId,
  };

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.patch<IAchievement>(
    '/api/game/collection/title/main',
    data,
    options
  );
};

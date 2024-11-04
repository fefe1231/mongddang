import axios from 'axios';
import {  ItitleInfo } from './types';

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

// export const getTitleInfo = async (accessToken: string): Promise<{ data: ItitleData[] }> => {
//   try {
//     const response = await axios.get<{ data: ItitleData[] }>('/api/game/collection/achievement', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching title info:', error);
//     throw error;
//   }
// };
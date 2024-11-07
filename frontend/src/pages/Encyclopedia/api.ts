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

// 새로 획득한 캐릭터(NEW) 표시 제거
export const getNewInfo = (accessToken: string, mongddangId: number) => {
  const data = {
    mongddangId,
  };

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.patch(
    '/api/game/collection/mongddang/check',
    data,
    options
  );
};

// 몽땅 모집
export const postRecruitment = (
  accessToken: string,
  mongddangId: number | undefined
) => {
  return api({
    url: '/api/game/collection/mongddang/recruitment',
    method: 'post',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      mongddangId: mongddangId,
    },
  });
};

// 메인 캐릭터 설정
export const getMainInfo = (accessToken: string, mongddangId: number) => {
  const data = {
    mongddangId,
  };

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return api.patch(
    '/api/game/collection/mongddang/main',
    data,
    options
  );
};
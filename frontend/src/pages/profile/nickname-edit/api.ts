import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 회원정보 닉네임 수정
export const updateNickname = (nickname: string) => {
  return api({
    url: '/api/user/nickname',
    method: 'post',
    data: {
      nickname: nickname,
    },
  });
};
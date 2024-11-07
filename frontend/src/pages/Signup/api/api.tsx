import axios from 'axios';
import { UserRole } from '..';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 회원정보 닉네임 수정
export const signUp = (
  idToken: string,
  role: UserRole,
  birth: string,
  name: string,
  nickname: string,
  gender: string
) => {
  return api({
    url: '/api/auth/signup',
    method: 'post',
    data: {
      idToken: idToken,
      role: role,
      birth: birth,
      name: name,
      nickname: nickname,
      gender: gender,
    },
  });
};

import { BaseApiResponse } from '../base.types';

type UserName = string;
type UserNickname = string;

interface Title {
  id: number;
  name: UserName;
}

export interface ConnectedUser {
  name: UserName;
  nickname: UserNickname;
}

type UserRole = 'child' | 'protector';
type Gender = 'male' | 'female';

export interface CreateUser {
  idToken: string;
  role: UserRole;
  birth: string;
  name: UserName;
  nickname: UserNickname;
  gender: Gender;
}

export type UpdateUser = Partial<Pick<CreateUser, 'nickname'>>;

export interface User extends CreateUser {
  email: string;
  invitationCode: string | null;
  mainMongddangId: number | null;
  mainTitle: Title | null;
  connected: ConnectedUser[];
}

export interface UserInfo {
  user: User | null;
  userAccessToken: string | null;
  userIdToken: string | null;
}

export interface UserResponse {
  code: number;
  message: string;
  data: User;
}

export interface LoginResponseData {
  isRegistered: boolean;
  accessToken: string;
}

export type LoginResponse = BaseApiResponse<LoginResponseData>;

export interface SignupResponseData {
  accessToken: string;
}

export type SignupResponse = BaseApiResponse<SignupResponseData>;

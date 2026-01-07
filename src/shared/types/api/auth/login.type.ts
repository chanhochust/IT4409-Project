import { ApiResponse } from '../common';

export type NormalLoginRequest = {
  email: string;
  password: string;
};

export type UserInfo = {
  id: string;
  name: string;
  email: string;
  role: string;
  language?: string;
  avatar?: string;
};

export type NormalLoginData = {
  accessToken: string;
  user: UserInfo;
};

export type SocialLoginRequest = {
  accessToken: string;
  login_type: string;
};

export type SocialLoginData = {
  accessToken: string;
  user: UserInfo;
};
export type NormalLoginResponse = ApiResponse<NormalLoginData>;

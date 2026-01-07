import { ApiResponse } from '../common';

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type RegisterData = {
  accessToken?: string;
  user?: {
    id: string;
    name?: string;
    email: string;
    role: string;
  };
};
export type RegisterResponse = ApiResponse<RegisterData>;

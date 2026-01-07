import { NormalLoginRequest, NormalLoginResponse } from 'src/shared/types/api/auth/login.type';
import { axiosClient } from './axios';
import { RegisterRequest, RegisterResponse } from 'src/shared/types/api/auth/register.type';
import { SignOutResponse } from 'src/shared/types/api/auth/signOut.type';
import { SwitchLanguageRequest, SwitchLanguageResponse } from 'src/shared/types/api/auth/switchLanguage.type';
import { ChangePasswordRequest, ChangePasswordResponse } from 'src/shared/types/api/auth/changePassword.type';
import { setCachedToken } from 'src/shared/stores/tokenNextAuthStore';

export class AuthService {
  static async normalLogin({ email, password }: NormalLoginRequest) {
    const body = new URLSearchParams({ email, password });
    const data = await axiosClient
      .post<NormalLoginResponse>('/auth/login', body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((res) => res.data);

    if (data?.data?.accessToken) {
      setCachedToken(data.data.accessToken);
    }

    return data;
  }
  static async register(data: RegisterRequest) {
    const { name, email, password } = data;
    const response = await axiosClient
      .post<RegisterResponse>('/auth/register', { name, email, password })
      .then((res) => res.data);

    if (response?.data?.accessToken) {
      setCachedToken(response.data.accessToken);
    }

    return response;
  }
  static async signOut() {
    const response = await axiosClient.get<SignOutResponse>('/sign_out').then((res) => res.data);
    setCachedToken(null);
    return response;
  }

  static async switchLanguage({ language }: SwitchLanguageRequest) {
    return axiosClient
      .post<SwitchLanguageResponse>(
        '/v1/projects/switch_language',
        { language },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .then((res) => res.data);
  }
  static async changePassword({ password, confirm_password }: ChangePasswordRequest) {
    const formData = new FormData();
    formData.append('password', password);
    formData.append('confirm_password', confirm_password);
    return axiosClient.post<ChangePasswordResponse>(`/v1/users/change_password`, formData).then((res) => res.data);
  }
}

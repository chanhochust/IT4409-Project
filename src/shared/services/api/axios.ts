import axios from 'axios';
import { getSession } from 'next-auth/react';
import { clientEnvironment } from 'src/shared/environments/client';
import { getCachedToken, setCachedToken } from 'src/shared/stores/tokenNextAuthStore';

export const axiosClient = axios.create({
  baseURL: `${clientEnvironment.apiURL}/api`,
  timeout: 30000,
});

export const aiAxiosClient = axios.create({
  baseURL: `${clientEnvironment.apiForAiURL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Attach the Authorization Header
axiosClient.interceptors.request.use(
  async (config) => {
    if (
      config.url === '/sign_in' ||
      config.url === '/sign_up' ||
      config.url === '/auth/social_login' ||
      config.url === '/auth/login' ||
      config.url === '/auth/register' ||
      config.url === '/products'
    ) {
      return config;
    }

    let token = getCachedToken();
    if (!token) {
      const session = await getSession();
      token = session?.user?.accessToken ?? null;
      setCachedToken(token);
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('Axios Interceptor Error:', error);
    // eslint-disable-next-line
    return Promise.reject(error);
  },
);

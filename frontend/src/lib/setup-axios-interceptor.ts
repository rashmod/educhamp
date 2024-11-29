import axios from 'axios';
import React from 'react';

import { refreshToken } from '@/api/user';

const axiosInstance = axios.create();
axiosInstance.defaults.withCredentials = true;

export function setupAxiosInterceptor(setAccessToken: React.Dispatch<React.SetStateAction<string | null>>) {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (!axios.isAxiosError(error) || !error.response || ![401].includes(error.response.status)) {
        return Promise.reject(error);
      }

      const { config: originalRequest, response: originalResponse } = error;
      if (!originalRequest) {
        console.log('error: there is no original request', error);
        return Promise.reject(error);
      }

      if (originalResponse.data.message === 'RefreshTokenInvalid') {
        console.log('error: JsonWebTokenError', error);
        return Promise.reject(error);
      }

      try {
        const res = await refreshToken();
        console.log(res);
        const data = res.data;

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
        setAccessToken(data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);
        console.log('error: failed to refresh token', refreshError);
        return Promise.reject(refreshError);
      }
    }
  );
}

export default axiosInstance;

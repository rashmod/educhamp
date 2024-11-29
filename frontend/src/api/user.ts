import env from '@/config/env';
import axiosInstance from '@/lib/setup-axios-interceptor';
import { SuccessResponse, User } from '@/types';

const API_URL = env.VITE_BACKEND_API_URL;

export async function register(input: {
  name: string;
  email: string;
  password: string;
}): Promise<SuccessResponse<{ user: Omit<User, 'grade'>; accessToken: string }>> {
  const response = await axiosInstance.post(API_URL + '/user/register', input);

  return response.data;
}

export async function login(input: {
  email: string;
  password: string;
}): Promise<SuccessResponse<{ user: Omit<User, 'grade'>; accessToken: string }>> {
  const response = await axiosInstance.post(API_URL + +'/user/login', input);

  return response.data;
}

export async function logout(): Promise<SuccessResponse<null>> {
  const response = await axiosInstance.post(API_URL + '/user/logout');

  return response.data;
}

export async function refreshToken(): Promise<SuccessResponse<{ user: Omit<User, 'grade'>; accessToken: string }>> {
  const response = await axiosInstance.post(API_URL + '/user/refresh-token');

  return response.data;
}

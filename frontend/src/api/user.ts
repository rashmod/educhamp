import axiosInstance from '@/lib/setup-axios-interceptor';
import { SuccessResponse } from '@/types';

export async function register(input: {
  name: string;
  email: string;
  password: string;
}): Promise<SuccessResponse<{ user: User; accessToken: string }>> {
  const response = await axiosInstance.post('http://localhost:3000/api/user/register', input);

  return response.data;
}

export async function login(input: {
  email: string;
  password: string;
}): Promise<SuccessResponse<{ user: User; accessToken: string }>> {
  const response = await axiosInstance.post('http://localhost:3000/api/user/login', input);

  return response.data;
}

export async function logout(): Promise<SuccessResponse<null>> {
  const response = await axiosInstance.post('http://localhost:3000/api/user/logout');

  return response.data;
}

export async function getUser(): Promise<SuccessResponse<User>> {
  const response = await axiosInstance.get('http://localhost:3000/api/user/me');

  return response.data;
}

export async function refreshToken(): Promise<SuccessResponse<{ accessToken: string; userId: string }>> {
  const response = await axiosInstance.post('http://localhost:3000/api/user/refresh-token');

  return response.data;
}

type User = { _id: string; name: string; email: string; grade: number };

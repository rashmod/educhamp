import axios from 'axios';

import { SuccessResponse } from '@/types';

export async function register(input: {
  name: string;
  email: string;
  password: string;
}): Promise<SuccessResponse<{ user: User; acccessToken: string }>> {
  const response = await axios.post('http://localhost:3000/api/user/register', input);

  return response.data;
}

export async function login(input: {
  email: string;
  password: string;
}): Promise<SuccessResponse<{ user: User; accessToken: string }>> {
  const response = await axios.post('http://localhost:3000/api/user/login', input);

  return response.data;
}

export async function logout(): Promise<SuccessResponse<null>> {
  const response = await axios.post('http://localhost:3000/api/user/logout');

  return response.data;
}

type User = { _id: string; name: string; email: string; grade: number };

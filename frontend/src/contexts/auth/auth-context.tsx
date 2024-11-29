import { UseMutationResult } from '@tanstack/react-query';
import React, { createContext } from 'react';

import { login, logout, register } from '@/api/user';
import { User } from '@/types';

type AuthContext = {
  register: UseMutationResult<Awaited<ReturnType<typeof register>>, Error, Parameters<typeof register>[0], unknown>;
  login: UseMutationResult<Awaited<ReturnType<typeof login>>, Error, Parameters<typeof login>[0], unknown>;
  logout: UseMutationResult<Awaited<ReturnType<typeof logout>>, Error, void, unknown>;
  session: {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
    changeGrade: (grade: number) => void;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  };
};

const AuthContext = createContext<AuthContext | null>(null);

export default AuthContext;

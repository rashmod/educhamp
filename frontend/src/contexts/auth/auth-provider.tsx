import { useState } from 'react';

import AuthContext from '@/contexts/auth/auth-context';
import useLogin from '@/hooks/use-login';
import useLogout from '@/hooks/use-logout';
import useRegister from '@/hooks/use-register';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>('67419665614314f4845e645b');

  const register = useRegister();
  const login = useLogin();
  const logout = useLogout();

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        session: {
          isAuthenticated: Boolean(accessToken),
          isLoading: true,
          userId,
          setAccessToken,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

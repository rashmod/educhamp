import { useEffect, useState } from 'react';

import AuthContext from '@/contexts/auth/auth-context';
import useLogin from '@/hooks/use-login';
import useLogout from '@/hooks/use-logout';
import useRefreshToken from '@/hooks/use-refresh-token';
import useRegister from '@/hooks/use-register';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [refreshingToken, setRefreshingToken] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>('67419665614314f4845e645b');

  const register = useRegister({ setAccessToken, setUserId });
  const login = useLogin({ setAccessToken, setUserId });
  const logout = useLogout();
  const { mutate: refreshToken, isPending: refreshTokenLoading } = useRefreshToken({ setAccessToken, setUserId });

  useEffect(() => {
    refreshToken();
    setRefreshingToken(false);
  }, [refreshToken]);

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        session: {
          isAuthenticated: Boolean(accessToken),
          isLoading: refreshTokenLoading || refreshingToken,
          userId,
          setAccessToken,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

import { useEffect, useState } from 'react';

import Loading from '@/components/custom/loading';
import AuthContext from '@/contexts/auth/auth-context';
import useLogin from '@/hooks/use-login';
import useLogout from '@/hooks/use-logout';
import useRefreshToken from '@/hooks/use-refresh-token';
import useRegister from '@/hooks/use-register';
import { User } from '@/types';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [refreshingToken, setRefreshingToken] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const register = useRegister({ setAccessToken, setUser });
  const login = useLogin({ setAccessToken, setUser });
  const logout = useLogout({ setAccessToken, setUser });
  const { mutate: refreshToken, isPending: refreshTokenLoading } = useRefreshToken({ setAccessToken, setUser });

  useEffect(() => {
    refreshToken();
    setRefreshingToken(false);
  }, [refreshToken]);

  const isLoading = refreshTokenLoading || refreshingToken;

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        session: {
          isAuthenticated: Boolean(accessToken),
          isLoading,
          user,
          setUser,
          changeGrade: (grade: number) => setUser((prev) => (prev ? { ...prev, grade } : null)),
          setAccessToken,
        },
      }}
    >
      {isLoading ? (
        <div className="grid h-screen place-items-center bg-primary text-9xl text-primary-foreground">
          <Loading />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

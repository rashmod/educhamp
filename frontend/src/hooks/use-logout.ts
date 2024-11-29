import { useMutation } from '@tanstack/react-query';

import { logout } from '@/api/user';
import axiosInstance from '@/lib/setup-axios-interceptor';
import { User } from '@/types';

export default function useLogout({
  setAccessToken,
  setUser,
}: {
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setAccessToken(null);
      setUser(null);
      axiosInstance.defaults.headers.common.Authorization = null;
    },
  });
}

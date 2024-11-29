import { useMutation } from '@tanstack/react-query';

import { refreshToken } from '@/api/user';
import { User } from '@/types';

export default function useRefreshToken({
  setAccessToken,
  setUser,
}: {
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}) {
  return useMutation({
    mutationFn: refreshToken,
    onSuccess: ({ data }) => {
      setAccessToken(data.accessToken);
      const {
        user: { name, _id, email },
      } = data;

      setUser((prev) => ({ name, _id, email, grade: prev?.grade || 7 }));
    },
  });
}

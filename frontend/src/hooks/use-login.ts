import { useMutation } from '@tanstack/react-query';

import { login } from '@/api/user';
import { User } from '@/types';

export default function useLogin({
  setAccessToken,
  setUser,
}: {
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}) {
  return useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      setAccessToken(data.accessToken);
      const {
        user: { name, _id, email, grade },
      } = data;

      setUser({ name, _id, email, grade });
    },
  });
}

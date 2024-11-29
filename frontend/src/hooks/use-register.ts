import { useMutation } from '@tanstack/react-query';

import { register } from '@/api/user';
import { User } from '@/types';

export default function useRegister({
  setAccessToken,
  setUser,
}: {
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}) {
  return useMutation({
    mutationFn: register,
    onSuccess: ({ data }) => {
      setAccessToken(data.accessToken);
      const {
        user: { name, _id, email },
      } = data;

      setUser({ name, _id, email, grade: 7 });
    },
  });
}

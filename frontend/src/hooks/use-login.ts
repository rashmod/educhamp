import { useMutation } from '@tanstack/react-query';

import { login } from '@/api/user';

export default function useLogin({
  setAccessToken,
  setUserId,
}: {
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  return useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      setAccessToken(data.accessToken);
      setUserId(data.user._id);
    },
  });
}
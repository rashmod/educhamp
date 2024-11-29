import { useMutation } from '@tanstack/react-query';

import { refreshToken } from '@/api/user';

export default function useRefreshToken({
  setAccessToken,
  setUserId,
}: {
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  return useMutation({
    mutationFn: refreshToken,
    onSuccess: ({ data }) => {
      setAccessToken(data.accessToken);
      setUserId(data.userId);
    },
  });
}

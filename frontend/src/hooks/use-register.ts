import { useMutation } from '@tanstack/react-query';

import { register } from '@/api/user';

export default function useRegister({
  setAccessToken,
  setUserId,
}: {
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  return useMutation({
    mutationFn: register,
    onSuccess: ({ data }) => {
      setAccessToken(data.accessToken);
      setUserId(data.user._id);
    },
  });
}

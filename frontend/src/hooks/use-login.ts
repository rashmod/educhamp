import { useMutation } from '@tanstack/react-query';

import { login } from '@/api/user';

export default function useLogin() {
  return useMutation({
    mutationFn: login,
  });
}

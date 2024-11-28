import { useMutation } from '@tanstack/react-query';

import { register } from '@/api/user';

export default function useRegister() {
  return useMutation({
    mutationFn: register,
  });
}

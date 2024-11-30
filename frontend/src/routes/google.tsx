import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

import useAuth from '@/contexts/auth/use-auth';

export const Route = createFileRoute('/google')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    const name = search.name as string | undefined;
    const email = search.email as string | undefined;
    const accessToken = search.accessToken as string | undefined;
    const _id = search._id as string | undefined;

    return { name, email, accessToken, _id };
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const {
    session: { setAccessToken, setUser },
  } = useAuth();
  const { _id, name, email, accessToken } = Route.useSearch();

  useEffect(() => {
    console.log({ name, email, accessToken, _id });
    if (!name || !email || !accessToken || !_id) {
      navigate({
        to: '/login',
      });
      return;
    }
    setAccessToken(accessToken);
    setUser({ email, name, _id, grade: 7 });
  }, [name, email, accessToken, _id, navigate]);

  return null;
}

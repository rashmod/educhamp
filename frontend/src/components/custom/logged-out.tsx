import React from 'react';

import useAuth from '@/contexts/auth/use-auth';

export default function LoggedOut({ children }: { children: React.ReactNode }) {
  const {
    session: { isAuthenticated },
  } = useAuth();

  if (!isAuthenticated) return children;
}

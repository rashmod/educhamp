import { RouterProvider as Router, createRouter } from '@tanstack/react-router';

import useAuth from '@/contexts/auth/use-auth';
import { routeTree } from '@/routeTree.gen';

export const router = createRouter({ routeTree, context: { auth: undefined! } });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function RouterProvider() {
  const auth = useAuth();
  return <Router router={router} context={{ auth }} />;
}
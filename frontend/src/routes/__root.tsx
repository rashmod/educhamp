import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import React from 'react';

import Navbar from '@/components/custom/navbar';
import AuthContext from '@/contexts/auth/auth-context';
import useAuth from '@/contexts/auth/use-auth';
import '@/index.css';
import { setupAxiosInterceptor } from '@/lib/setup-axios-interceptor';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() => import('@tanstack/router-devtools').then((res) => ({ default: res.TanStackRouterDevtools })));

const TanStackQueryDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() => import('@tanstack/react-query-devtools').then((res) => ({ default: res.ReactQueryDevtools })));

const queryClient = new QueryClient();

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const {
    session: { setAccessToken },
  } = useAuth();

  setupAxiosInterceptor(setAccessToken);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid min-h-[100dvh] grid-rows-[auto_1fr]">
        <Navbar />
        <div className="container mx-auto grid grid-rows-subgrid p-8">
          <Outlet />
        </div>
      </div>

      <TanStackRouterDevtools initialIsOpen={false} />
      <TanStackQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

type RouterContext = {
  auth: AuthContext;
};

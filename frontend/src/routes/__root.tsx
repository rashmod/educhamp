import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import React from 'react';

import '@/index.css';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() => import('@tanstack/router-devtools').then((res) => ({ default: res.TanStackRouterDevtools })));

const TanStackQueryDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() => import('@tanstack/react-query-devtools').then((res) => ({ default: res.ReactQueryDevtools })));

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <div className="grid min-h-[100dvh] grid-rows-[auto_1fr]">
        <div className="container">navbar</div>
        <div className="container mx-auto grid grid-rows-subgrid p-8">
          <Outlet />
        </div>
      </div>

      <TanStackRouterDevtools initialIsOpen={false} />
      <TanStackQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  ),
});

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import '@/index.css';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <div className="grid min-h-[100dvh] grid-rows-[auto_1fr]">
        <div className="container">navbar</div>
        <div className="container mx-auto grid grid-rows-subgrid p-8">
          <Outlet />
        </div>
        <TanStackRouterDevtools />
      </div>
    </QueryClientProvider>
  ),
});

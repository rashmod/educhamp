import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import AuthProvider from '@/contexts/auth/auth-provider';
import Router from '@/providers/router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </StrictMode>
);

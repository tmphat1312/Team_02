import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Providers } from './Providers.tsx';
import { RoutesProvider } from './RoutesProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <RoutesProvider />
    </Providers>
  </StrictMode>
);

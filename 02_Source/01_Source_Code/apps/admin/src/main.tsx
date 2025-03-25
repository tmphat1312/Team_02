import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';

import { NuqsAdapter } from 'nuqs/adapters/react';

import './index.css';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primeicons/primeicons.css';

import { RoutesProvider } from './RoutesProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <NuqsAdapter>
        <RoutesProvider />
      </NuqsAdapter>
    </PrimeReactProvider>
  </StrictMode>
);

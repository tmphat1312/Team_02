import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';

import './index.css';
import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import '@fontsource/caveat-brush';

import { RoutesProvider } from './RoutesProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <RoutesProvider />
    </PrimeReactProvider>
  </StrictMode>
);

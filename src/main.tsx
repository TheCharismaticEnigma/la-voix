import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css'; // contains global styles for the application.

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { chakraTheme } from './utils/chakraCustomTheme.ts';
import { RouterProvider } from 'react-router-dom';
import router from './router.tsx';
import staleTime from './utils/staleTime.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      cacheTime: staleTime('24h'),
    },
  },
});

// StaleTime => time after which data is considered STALE, and thus will be refetched.
// CacheTime => time after which data is garbage collected.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={chakraTheme}>
      <ColorModeScript initialColorMode={chakraTheme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
        {/* <App /> */}
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);

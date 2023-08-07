import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const palette = {
  colors: {
    white: 'rgb(255,255,255)',
    black: 'rgb(0,0,0)',
    gray: {
      50: '#f9f9f9',
      100: '#ededed',
      200: '#d3d3d3',
      300: '#b3b3b3',
      400: '#a0a0a0',
      500: '#898989',
      600: '#252525',
      700: '#262626',
      800: '#262626',
      900: '#0d0d0d',
    },
  },
};

export const chakraTheme = extendTheme({
  config,
  ...palette,
  fonts: {
    body: 'system-ui, sans-serif',
  },
});

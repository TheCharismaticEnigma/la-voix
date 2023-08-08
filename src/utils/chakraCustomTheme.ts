import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const palette = {
  colors: {
    white: 'rgb(255,255,255)',
    black: 'rgb(0,0,0)',
    yellow: {
      200: '#fedb01',
    },
    green: {
      200: '#1DB954',
    },
    gray: {
      50: '#f9f9f9',
      100: '#ededed',
      200: '#d3d3d3',
      300: '#b3b3b3',
      400: '#a0a0a0',
      500: '#898989',
      600: '#252525',
      700: '#26262680', // For Cards and Highlights
      800: '#121212', // For Background
      900: '#121212',
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

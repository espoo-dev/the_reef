import { DefaultTheme } from 'styled-components';

export const defaultTheme: DefaultTheme = {
  maxWidth: '1200px',
  borderColor: '#eaeaea',
  borderRadius: '6px',
  boxShadow: '-1px 12px 23px -10px rgb(0 0 0 / 15%)',
  pallete: {
    common: {
      black: '#222831',
      white: '#ffffff',
      background: '#edfbfe',
    },
    primary: {
      main: '#fe7061',
      contrastText: '#61dffe',
    },
    secondary: {
      main: '#464646',
      contrastText: '#acaaab',
    },
  },
  breakpoints: {
    mobile: '0px',
    tablet: '640px',
    laptop: '1024px',
    desktop: '1200px',
  },
};

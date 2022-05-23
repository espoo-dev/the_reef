import 'styled-components';

interface IPalette {
  main: string;
  contrastText: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    maxWidth: string;
    borderColor: string;
    borderRadius: string;
    boxShadow: string;
    pallete: {
      common: {
        black: string;
        white: string;
        background: string;
      };
      primary: IPalette;
      secondary: IPalette;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      laptop: string;
      desktop: string;
    };
  }
}

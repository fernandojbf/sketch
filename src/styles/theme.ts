// This theme is really incomplete, but we do not need anything more complex than this.

const theme = {
  fontSizes: [
    '1.2rem',
    '1.4rem',
    '1.6rem',
    '2.4rem',
    '3.2rem',
    '4.8rem',
    '6.4rem',
  ],
  space: ['4px', '8px', '12px', '16px', '32px', '64px'],
  sizes: ['4px', '8px', '12px', '16px', '32px', '64px'],
  colors: {
    white: 'white',
    gray: 'gray',
    black: 'black',
  },

  shadows: {
    medium: '0px 0px 0px 1px rgba(0,0,0,.06)',
    hard: '0px 0px 4px 1px rgba(0,0,0,.3)',
  },
};

export type ThemeProps = {
  theme: typeof theme;
};

export default theme;

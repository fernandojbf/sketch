import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    font-size: 62.5%;
    margin: 0;
    display: flex;
    min-width: 100%;
    min-height: 100%;
  }

  #__next {
    display: flex;
    flex:1;
  }
`;

import { ThemeProvider } from 'styled-components';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RecoilRoot } from 'recoil';
import { ApolloProvider } from '@apollo/client';

import DocumentInspector from '../state/document/DocumentInspector';
import useIsFirstRender from '../hooks/useIsFirstRender';

import theme from '../styles/theme';
import GlobalStyle from '../styles/global';

export const client = new ApolloClient({
  uri: 'https://graphql.sketch.cloud/api',
  cache: new InMemoryCache(),
});

const MyApp = ({ Component, pageProps }) => {
  const isFirstRender = useIsFirstRender();

  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <DocumentInspector />
          <Component {...pageProps} isFirstRender={isFirstRender} />
        </ThemeProvider>
      </ApolloProvider>
    </RecoilRoot>
  );
};

export default MyApp;

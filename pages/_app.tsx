import { ThemeProvider } from "styled-components";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RecoilRoot } from "recoil";
import { ApolloProvider } from "@apollo/client";

import DocumentInspector from "../state/document/DocumentInspector";

import theme from "../styles/theme";
import GlobalStyle from "../styles/global";

export const client = new ApolloClient({
  uri: "https://graphql.sketch.cloud/api",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <DocumentInspector />
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default MyApp;

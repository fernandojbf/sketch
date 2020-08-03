import { ThemeProvider } from "styled-components";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

import theme from "../styles/theme";
import GlobalStyle from "../styles/global";

const client = new ApolloClient({
  uri: "https://graphql.sketch.cloud/api",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;

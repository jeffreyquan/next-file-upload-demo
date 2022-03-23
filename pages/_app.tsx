import { ApolloProvider } from "@apollo/client";
import "../styles/globals.css";
import "../styles/reset.css";
import type { AppProps } from "next/app";
import { useApollo } from "../apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;

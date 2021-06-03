import "../styles/index.css";
import "../styles/components/input.css";
import "../styles/components/button.css";
import "../styles/components/card.css";
import "../styles/components/message.css";
import "../styles/components/loading.css";
import "../styles/components/confirmCard.css";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

export const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;

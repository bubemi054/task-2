import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://be2-fe-task-us-east-1-staging.dcsdevelopment.me/graphql", // Your API
  cache: new InMemoryCache(),
});

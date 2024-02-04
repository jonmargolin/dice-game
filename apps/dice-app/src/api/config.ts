import { GraphQLClient } from 'graphql-request';
export const url = import.meta.env.VITE_API_URL;
const graphqlEndpoint = url + 'graphql';
export const graphQLClient = new GraphQLClient(graphqlEndpoint, {
  credentials: 'include',
});

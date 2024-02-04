import { UseMutationOptions, useMutation } from 'react-query';
import { graphQLClient } from '../api/config';

// Update the mutation operation to match your GraphQL schema
const logOutMutation = `
  mutation {
    logOutGame
  }
`;

const useLogOutMutation = (options?: UseMutationOptions<boolean, Error>) => {
  return useMutation(
    async () => {
      const response = await graphQLClient.request<{ logOutGame: boolean }>(
        logOutMutation
      );
      return response.logOutGame;
    },
    {
      ...options,
    }
  );
};

export default useLogOutMutation;

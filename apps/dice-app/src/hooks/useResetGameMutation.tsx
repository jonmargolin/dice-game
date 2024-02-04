import { UseMutationOptions, useMutation } from 'react-query';
import { graphQLClient } from '../api/config';

// Update the mutation operation to match your GraphQL schema
const resetGameMutation = `
  mutation {
    resetGame
  }
`;

const useResetGameMutation = (options?: UseMutationOptions<boolean, Error>) => {
  return useMutation(
    async () => {
      const response = await graphQLClient.request<{ resetGame: boolean }>(
        resetGameMutation
      );
      return response.resetGame;
    },
    {
      ...options,
    }
  );
};

export default useResetGameMutation;

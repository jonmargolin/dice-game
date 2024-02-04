import { UseMutationOptions, useMutation } from 'react-query';
import { graphQLClient } from '../api/config';

// Update the mutation operation to match your GraphQL schema
const skipTurnMutation = `
  mutation {
    skipRound
  }
`;

const useSkipTurnMutation = (options?: UseMutationOptions<boolean, Error>) => {
  return useMutation(
    async () => {
      const response = await graphQLClient.request<{ skipRound: boolean }>(
        skipTurnMutation
      );
      return response.skipRound;
    },
    {
      ...options,
    }
  );
};

export default useSkipTurnMutation;

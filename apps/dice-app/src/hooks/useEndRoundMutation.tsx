import { UseMutationOptions, useMutation } from 'react-query';
import { graphQLClient } from '../api/config';

// Update the mutation operation to match your GraphQL schema
const endRoundMutation = `
  mutation {
    endRound
  }
`;

const useEndRoundMutation = (options?: UseMutationOptions<boolean, Error>) => {
  return useMutation(
    async () => {
      const response = await graphQLClient.request<{ endRound: boolean }>(
        endRoundMutation
      );
      return response.endRound;
    },
    {
      ...options,
    }
  );
};

export default useEndRoundMutation;

import { useMutation, UseMutationOptions } from 'react-query';
import { graphQLClient } from '../api/config';
import { RollResult } from '../components/interfaces';

const rollDiceMutation = `
  query {
    rollDice {
      rollList
      rollProbability
      rollSum
      roundNumber
      userId
    }
  }
`;

const useRollDiceMutation = (
  options?: UseMutationOptions<RollResult, Error>
) => {
  return useMutation(
    async () => {
      const response = await graphQLClient.rawRequest<{ rollDice: RollResult }>(
        rollDiceMutation
      );
      return response.data.rollDice;
    },
    {
      ...options,
    }
  );
};

export default useRollDiceMutation;

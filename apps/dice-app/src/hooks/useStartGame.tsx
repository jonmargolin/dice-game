import { useMutation } from 'react-query';
import { graphQLClient } from '../api/config';




// Update the mutation operation to match your GraphQL schema
const startGameMutation = `
  mutation {
    startGame
  }
`;

const useStartGameMutation = () => {
    return useMutation(
      async () => {
        const response = await graphQLClient.request<{ startGame: boolean }>(startGameMutation);
        return response.startGame;
      },
      {
        // You can provide additional options for the mutation
      }
    );
  };

export default useStartGameMutation;

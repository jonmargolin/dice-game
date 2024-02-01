// src/hooks/useGameContextData.ts
import { useEffect } from 'react';
import { useGameContext } from '../gameContext/gameContext';


const useGameContextData = () => {
  const { state, dispatch } = useGameContext();

  // Effect to query context data whenever the component using this hook mounts
  useEffect(() => {
    dispatch({ type: 'QUERY_CONTEXT' });
  }, [dispatch]);
  const getLastRollSum = () => {
    if (state.userRolls.length > 0) {
      return  { sum :state.userRolls[0].rollSum, round: state.userRolls[0].roundNumber}; 
    }
    return  null; // Default value if userRolls is empty
  };
 
  return {
    userRolls: state.userRolls,
    getLastRollSum,
    round: state.round,
    result: state.result,
    userId: state.userRolls[0]?.userId?? null,
    wins: state.winNumber
  }
};

export default useGameContextData;

// src/GameContext.tsx
import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';
import { GameContextData, ResultItem, RoundEndState, RoundResult } from './interface';

interface GameContextProps {
  children: ReactNode;
}

interface GameContextState {
  userRolls: GameContextData[];
  round: RoundEndState
  result: ResultItem[]
  winNumber: number;
}


const initialState: GameContextState = {
    userRolls: [],
    round:{status:true, timer:0},
    result:[],
    winNumber:0
};
type GameContextAction =
  | { type: 'UPDATE_USER_ROLL'; payload: Partial<GameContextData> }
  | { type: 'QUERY_CONTEXT' }
  | { type: 'UPDATE_ROUND'; payload: Partial<RoundEndState>}
  | { type: 'QUERY_ROUND'; payload: Partial<RoundEndState>}
  | { type: 'UPDATE_RESULT'; payload: Partial<RoundResult>}
  | { type: 'CLEAR_RESULT'}
  | { type: 'CLEAR_GAME'}
  | { type: 'LOGOUT'}
const reducer = (state: GameContextState, action: GameContextAction): GameContextState   => {
  switch (action.type) {
    case 'UPDATE_USER_ROLL':{
        const userRollsArray =[]
        if(action.payload){
        userRollsArray.push(action.payload as GameContextData);
        }
        userRollsArray.push(...state.userRolls);
      return {
        ...state,
        userRolls: userRollsArray,
      };
    }
case 'UPDATE_ROUND':{
    return{...state, ...action.payload}
}
      case 'QUERY_CONTEXT':
        return state; 
  case 'UPDATE_RESULT':{
        if(action.payload.isWin){
            const winNumber = state.winNumber+1
            return{...state, result: action.payload.data, winNumber: winNumber } as GameContextState
        }
    return  {...state, result:action.payload.data} as GameContextState
}
case "CLEAR_RESULT":
    return {...state, result:[]}
    case "CLEAR_GAME": {
        return{ ...state, result:[], userRolls:[],  round:{status:true, timer:60}}
    } 
    case"LOGOUT":
    return{...initialState}
    default:
      return state;
  }

};

const GameContext = createContext<{ state: GameContextState ; dispatch: Dispatch<GameContextAction> } | undefined>(undefined);

const GameContextProvider: React.FC<GameContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
};

const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameContextProvider');
  }
  return context;
};

export { GameContextProvider, useGameContext };

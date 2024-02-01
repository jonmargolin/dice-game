import{useEffect, useRef, useState} from "react"
import { RollResult } from "../components/interfaces";
import {useGameContext } from "../gameContext/gameContext";
import useRollDiceMutation from "../hooks/useRollDiceMutation";
import GameResults from "./gameResulte";
import SideBar from "./sideBar";
import useEndRoundMutation from "../hooks/useEndRoundMutation";
import useGameEvents from "../hooks/useGameEvents";
import Modal from 'react-modal';
import EndGameModal from '../components/endGameModal/endGameModal';
import useGameContextData from "../hooks/useGameContextData";
import useSkipTurnMutation from "../hooks/useSkipTurnMutation";
import { ToastContainer, toast } from 'react-toastify';
import useResetGameMutation from "../hooks/useResetGameMutation";
import useLogOutMutation from "../hooks/useLogOutMutation";
import { useNavigate } from "react-router-dom";
import { customStyles } from "../const/const";


const GameLayout = () => {
    const { mutate: muteRollDice} = useRollDiceMutation();
    const {mutate: muteSkipTurn} = useSkipTurnMutation();
    const {mutate: mutateClearGame} = useResetGameMutation();
    const{mutate: mutateLogOut} = useLogOutMutation()
    const {  dispatch } = useGameContext();
    const { userId} = useGameContextData();
    const {mutate: endRoundMutation} = useEndRoundMutation()
    const [isModalOpen, setModalOpen] = useState(false)
    const navigate = useNavigate()
    const eventSourceRef = useRef<EventSource | null>(null);
    const timerRef = useRef<number | null>()
    const handleMessage = (event: MessageEvent) => {
        // Handle the incoming event data
        const data = JSON.parse(event.data);
        if(data){
            if (!Array.isArray(data.message)) {
                dispatch({type:"UPDATE_ROUND", payload: data.message})
            timerRef.current=data.message
            setModalOpen(true)
            }
            else {
                const {message}= data
                message.sort((a, b) => {
                    const rollSumComparison = parseInt(b.rollSum) - parseInt(a.rollSum);
                  
                    // If rollSum is the same, compare by roundNumber
                    return rollSumComparison !== 0
                      ? rollSumComparison
                      : parseInt(a.roundNumber) - parseInt(b.roundNumber);
                  });
                   const isWin= message[0].userId === userId
                dispatch({type:"UPDATE_RESULT", payload: {data: message, isWin:isWin}})
            setModalOpen(false)
            }
            
            
        }
      };
      const {closeConnection}= useGameEvents(handleMessage)
   
    useEffect(() => {
      return () => {
        if (eventSourceRef.current) {
         closeConnection()
          }
      };
    }, [closeConnection]);
    const  handelError =(msg:string) => {
        const errMsg =  msg.split(':')[0]
        toast.error(errMsg, {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
     }
    const rollDice =() => {
       
        muteRollDice(undefined,{onSuccess: (data) => updateGameContext(data), onError: (err) => handelError(err.message)})
    }
    const endRound =() => {
        dispatch({type:"CLEAR_RESULT"})
        endRoundMutation(undefined,{ onError: (err) => handelError(err.message)})
    }
     const skipTurn =() => {
        muteSkipTurn(undefined,{ onError: (err) => handelError(err.message)})
     }
  
    const updateGameContext =(data: RollResult) => {

        if(data){
        dispatch({ type: 'UPDATE_USER_ROLL', payload:data})
        }
    }
    const clearContextGame =() => {
        dispatch({ type: 'CLEAR_GAME'})
    }
    const clearGame =() => {
        mutateClearGame(undefined,{onSuccess: () => clearContextGame(), onError: (err) => handelError(err.message)})
    }
     const  logoutContext =() => {
        dispatch({ type: 'LOGOUT'})
        navigate("/")

     }
     const logOut =() => {
        mutateLogOut(undefined,{onSuccess: () => logoutContext(),onError: (err) => handelError(err.message)})
     }
    return (

        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <SideBar rollDice={() =>  rollDice()} endRound={() => endRound()} logOut={() => logOut()} />
            <GameResults resetGame={() => clearGame()} />
            <Modal
        isOpen={isModalOpen}
        style={customStyles}
        ariaHideApp={false}
      >
  <EndGameModal reRoll={() => rollDice()} timer={timerRef.current as number} skipTurn={() =>skipTurn()} />
        </Modal>
        <ToastContainer />
        </div>

    );
};

export default GameLayout;



import React from 'react';
interface ResultMessageProps{
win: boolean
position :number
}
const ResultMessage = ({win, position}: ResultMessageProps) => {
     const checkIfWin=()=>{
        if(win){
            return <h1 className="text-xl font-bold mb-4"> you won the round!!! </h1>
        }
       return
     }
    return (
        <div className='mr-16'>
        <h1 className="text-xl">your roll is at position: {position} </h1>
        {checkIfWin()}
        </div>
    );
};

export default ResultMessage;
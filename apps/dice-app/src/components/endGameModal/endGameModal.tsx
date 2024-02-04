import React from 'react';
import ModalTitle from './modalTitle';
import ModalBody from './modalBody';
interface EndGameModalProps {
  timer: number;
  reRoll: () => void;
  skipTurn: () => void;
}
const EndGameModal = ({ timer, reRoll, skipTurn }: EndGameModalProps) => {
  return (
    <div>
      <ModalTitle
        title="Round over"
        subTitle=" The round is ended. Would you like to reroll the dice?"
      />
      <ModalBody timer={timer} skipTurn={skipTurn} reRoll={reRoll} />
    </div>
  );
};

export default EndGameModal;

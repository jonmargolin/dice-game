import Button from '../button';
import ModalCounter from './modalCounter';
interface ModalBodyProps {
  timer: number;
  reRoll: () => void;
  skipTurn: () => void;
}
const ModalBody = ({ timer, reRoll, skipTurn }: ModalBodyProps) => {
  return (
    <div>
      <div className="flex justify-center space-x-4">
        <Button text="  Reroll" onclick={reRoll} />
        <Button text=" Skip the turn" onclick={skipTurn} />
      </div>
      <ModalCounter title="Time left for the round:" timer={timer} />
    </div>
  );
};

export default ModalBody;

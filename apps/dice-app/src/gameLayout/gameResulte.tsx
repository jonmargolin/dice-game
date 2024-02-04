import Button from '../components/button';

import ChartPie from '../components/pieChart';
import useGameContextData from '../hooks/useGameContextData';
import EmptyRollView from './emptyRollView';
import RollList from './rollList';
import RollResult from './rollResult';

interface GameResultsProps {
  resetGame: () => void;
}

const GameResults = ({ resetGame }: GameResultsProps) => {
  const { userRolls, getLastRollSum, result, userId } = useGameContextData();
  const lastRound = getLastRollSum();
  const checkResult = () => {
    if (result?.length > 0) {
      return <RollResult data={result} userId={userId} />;
    }
    return;
  };

  return (
    <main className="flex-1 p-4 overflow-auto bg-[url('assets/img-roling-dice-op.png')]">
      <div className="flex justify-between">
        {userRolls.length > 0 ? (
          <>
            <RollList rollList={userRolls} />{' '}
            <ChartPie lastSum={lastRound?.sum} />{' '}
          </>
        ) : (
          <EmptyRollView />
        )}
      </div>
      <div className="flex ">
        <div className="w-[12%]">
          <Button text="Reset game " onclick={resetGame} />
        </div>

        {checkResult()}
      </div>
    </main>
  );
};

export default GameResults;

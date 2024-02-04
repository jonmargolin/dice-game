import React from 'react';
import RollItem from './rollItem';
import { GameContextData } from '../gameContext/interface';
type RollListProps = {
  rollList: GameContextData[];
};
const RollList = ({ rollList }: RollListProps) => {
  const createRollList = () => {
    const lisOfRoll: React.ReactNode[] = [];
    if (rollList.length > 0) {
      rollList.forEach((rollItem, index) => {
        lisOfRoll.push(
          <RollItem
            key={`rollItem${index}${rollItem?.roundNumber}`}
            rollArray={rollItem.rollList}
            sum={rollItem?.rollSum}
            probability={rollItem?.rollProbability}
            rollNumber={rollItem?.roundNumber}
          />
        );
      });
      return lisOfRoll;
    }
  };
  return (
    <div className="min-h-[500px] w-full">
      <h1 className="text-2xl font-bold mb-4">Roll History</h1>
      <ul className="space-y-4 max-h-[500px] overflow-y-auto">
        {createRollList()}
      </ul>
    </div>
  );
};

export default RollList;

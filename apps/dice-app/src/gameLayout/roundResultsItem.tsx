import React from 'react';
interface roundResultItemProps {
  sum: number;
  rollNumbers: string;
}
const RoundResultItem = ({ sum, rollNumbers }: roundResultItemProps) => {
  return (
    <li className="flex items-start space-x-4">
      <div className="flex">
        <h2 className="text-lg font-bold"> Result</h2>
        <div className="flex">
          <p className="ml-1">Sum: {sum}</p>
          <p className="ml-1">numbers: {rollNumbers}</p>
        </div>
      </div>
    </li>
  );
};

export default RoundResultItem;

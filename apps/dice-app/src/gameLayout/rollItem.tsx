
export type RollItemProps ={
    sum: number,
    probability: number
    rollNumber: number
    rollArray: number
}
const RollItem = ({sum, probability, rollNumber, rollArray}:RollItemProps) => {
    return (
        <li className="flex items-start space-x-4">
        <div className="flex-1">
          <h2 className="text-lg font-bold">Roll {rollNumber}</h2>
          <p>Sum: {sum}</p>
          <p>Probability: {probability}%</p>
          <p>Roll numbers:{rollArray.toString()} </p>
        </div>
      </li>
    );
};

export default RollItem;
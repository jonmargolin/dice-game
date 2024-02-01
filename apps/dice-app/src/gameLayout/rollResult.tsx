
import { JSX } from 'react/jsx-runtime';
import RoundResultItem from './roundResultsItem';
import { ResultItem } from '../gameContext/interface';
import ResultMessage from '../components/resulteMessage';

 type RollResultProp={
    data: ResultItem[]
    userId: string 
 }
const RollResult = ({data, userId}:RollResultProp) => {
    const isWin = data[0].userId === userId
    const userPosition = data.findIndex(item=> item.userId === userId)
    const createRollList=() => {
         const itemList: JSX.Element[] =[]
        data.forEach((item,index) =>itemList.push(<RoundResultItem key={`res${index}${item.userId}`}  sum={item.rollSum} rollNumbers={item.rollList} />))
        return itemList
    }
    return (
        <div className='flex grow justify-center flex-col items-start ml-5 bg-sky-500/[0.05] pl-16  pb-[1rem]'>
            <div className='flex w-full justify-between'>
              <h1 className="text-2xl font-bold mb-4">Roll Result</h1>
              <ResultMessage win={isWin} position={userPosition} />
              </div>
              <div className='max-h-[250px] overflow-y-auto w-full'>
        <ul className="flex flex-col">
            {createRollList()}
        </ul>
        </div>
        </div>
    );
};

export default RollResult;
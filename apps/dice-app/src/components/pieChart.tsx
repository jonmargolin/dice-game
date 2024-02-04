import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React from 'react';
ChartJS.register(ArcElement, Tooltip, Legend);
interface ChartPieProps {
  lastSum?: number;
}
const ChartPie = ({ lastSum = 0 }: ChartPieProps) => {
  const checkLastSum = () => {
    if (lastSum) {
      const heigherPrba = lastSum ? 1 - lastSum : null;
      const data = {
        labels: ['lower', 'higher'],
        datasets: [
          {
            label: '# of higher number probability',
            data: [0.11, heigherPrba],
            backgroundColor: ['rgba(255, 99, 132)', 'rgba(75, 192, 192)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1,
          },
        ],
      };
      return <Pie data={data} />;
    }
    return <></>;
  };
  return (
    <div key={lastSum} className="w-[30%] h-[300px] flex-col flex items-center">
      <span> Next round probability: </span>
      {checkLastSum()}
    </div>
  );
};

export default React.memo(ChartPie);

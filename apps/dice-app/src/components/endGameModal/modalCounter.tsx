import React from 'react';
type ModalCounterProps = {
  title: string;
  timer: number;
};
const ModalCounter = ({ title, timer }: ModalCounterProps) => {
  return (
    <div className="mt-6 text-center">
      <p className="text-gray-600 dark:text-gray-300">{title}</p>
      <p className="text-gray-600 dark:text-gray-300 text-4xl font-bold">
        {timer}
      </p>
    </div>
  );
};

export default ModalCounter;

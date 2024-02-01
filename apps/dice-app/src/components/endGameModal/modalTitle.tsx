import React from 'react';
type ModalTitleProps ={
    title: string,
    subTitle: string
}
const ModalTitle = ({title, subTitle}:ModalTitleProps) => {
    return (
        <div>
        <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
    <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
  {subTitle}
    </p>
        </div>
    );
};

export default ModalTitle;
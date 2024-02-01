import React from 'react';
type ButtonProps ={
    text: string
    onclick: ()=> void
}
const Button = ({text, onclick}: ButtonProps) => {
    return (
        <button onClick={onclick} className="inline-flex bg-black text-white items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-slate-500 h-10 px-4 py-2 mb-4 w-full">
        {text}
      </button>
    );
};

export default Button;
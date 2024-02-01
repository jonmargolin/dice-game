 type WelcomeProps ={
    startGame:()=> void;
 }

const Welcome = ({startGame}:WelcomeProps) => {
    return (
        <div className="flex flex-col h-screen justify-center items-center bg-gray-100 dark:bg-gray-900 bg-[url('assets/imagedice.png')] bg-cover bg-center bg-no-repeat bg-[length:50%_100%]">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md ">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold whitespace-nowrap tracking-tight text-2xl text-center">Rolling Dice Game</h3>
            <p className="text-sm text-muted-foreground text-center">
              Enter the world of fun and excitement. Let's roll the dice!
            </p>
          </div>
          <div className="p-6 flex justify-center">
            <button onClick={startGame} className="inline-flex items-center justify-center whitespace-nowrap rounded-md
            bg-black text-white
             text-sm font-medium ring-offset-background transition-colors
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
               focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full max-w-xs">
               Start New Game
            </button>
          </div>
        </div>
      </div>
    );
};

export default Welcome;
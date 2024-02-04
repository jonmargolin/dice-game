import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { GameContextProvider } from '../gameContext/gameContext';
import GameLayout from '../gameLayout/gameLayout';
import Welcome from '../welcome/welcome';
import useStartGameMutation from '../hooks/useStartGame';

const Layout = () => {
  const { mutate } = useStartGameMutation();
  const navigate = useNavigate();
  const startGame = () => {
    mutate(undefined, {
      onSuccess: () => {
        navigate('/game');
      },
      onError: () => {
        console.log('error');
      },
    });
  };
  return (
    <GameContextProvider>
      <div>
        <Routes>
          <Route path="/" element={<Welcome startGame={() => startGame()} />} />
          <Route path="/game" element={<GameLayout />} />
        </Routes>
        {/* END: routes */}
      </div>
    </GameContextProvider>
  );
};

export default Layout;

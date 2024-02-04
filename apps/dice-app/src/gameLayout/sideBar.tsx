import React from 'react';
import Button from '../components/button';
import useGameContextData from '../hooks/useGameContextData';
import { IoMdLogOut } from 'react-icons/io';
interface SideBarProps {
  rollDice: () => void;
  endRound: () => void;
  logOut: () => void;
}
const SideBar = ({ rollDice, endRound, logOut }: SideBarProps) => {
  const { getLastRollSum, wins } = useGameContextData();
  const lastRound = getLastRollSum();
  return (
    <aside className="w-64 m-1 shadow-2xl bg-white dark:bg-gray-800 p-4">
      <div className="items-baseline flex justify-between">
        <h2 className="text-xl font-bold mb-4">Game Controls</h2>
        <IoMdLogOut className="hover:cursor-pointer" onClick={logOut} />
      </div>
      <Button text="Roll Dice" onclick={rollDice} />
      <Button text="End Round" onclick={endRound} />
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Stats</h3>
        <p className="mb-2">Round: {lastRound?.round ?? 0}/10</p>
        <p>Last Roll Sum: {lastRound?.sum ?? 0}</p>
        <p>Wins: {wins ?? 0}</p>
      </div>
    </aside>
  );
};

export default SideBar;

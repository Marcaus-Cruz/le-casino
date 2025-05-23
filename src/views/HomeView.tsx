import Table from '../components/Table';
import { useState } from 'react';
import type { GameType } from '../types/table.types';
import { GAME_TYPES } from '../types/table.types';

export default function HomeView() {
   const [selectedGame, setSelectedGame] = useState<GameType | null>(null);

   const validGameTypes: GameType[] = ['draw-five'];

   const onGameLeave = () => setSelectedGame(null);

   return (
      <div className='view home'>
         {!selectedGame && <div className='caption'>Le Casino</div>}
         {!selectedGame && (
            <div className='game-container'>
               {Object.entries(GAME_TYPES).map(([btnText, gameType]) => {
                  return (
                     <button
                        key={gameType}
                        className='btn'
                        onClick={() => setSelectedGame(gameType)}
                        disabled={!validGameTypes.includes(gameType)}
                     >
                        {btnText}
                     </button>
                  );
               })}
            </div>
         )}

         {!!selectedGame && <Table selectedGame={selectedGame} onGameLeave={onGameLeave} />}
      </div>
   );
}

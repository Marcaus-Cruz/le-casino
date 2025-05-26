import type { GameType } from '../types/table.types';

type TableHeaderProps = {
   readonly selectedGame: GameType;
   readonly onGameLeave: () => void;
};
export default function TableHeader({ selectedGame, onGameLeave }: TableHeaderProps) {
   return (
      <div className='table-header'>
         <div className={`current-game ${selectedGame}`}>{selectedGame}</div>
         <button className='btn btn-exit' onClick={() => onGameLeave()}>
            Leave Game
         </button>
      </div>
   );
}

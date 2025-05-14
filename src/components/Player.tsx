import type { Player as PlayerData } from '../types/player.types';
import Card from './Card';

const PLAYER_ONE: PlayerData = {
   name: 'Player1',
   role: 'regular',
   dealtCards: [],
   hand: [],
   leftNeighbor: undefined,
   rightNeighbor: undefined,
   position: -1,
};
const PLAYER_TWO: PlayerData = {
   name: 'Player2',
   role: 'regular',
   dealtCards: [],
   hand: [],
   leftNeighbor: undefined,
   rightNeighbor: undefined,
   position: -1,
};
const PLAYER_THREE: PlayerData = {
   name: 'Player3',
   role: 'regular',
   dealtCards: [],
   hand: [],
   leftNeighbor: undefined,
   rightNeighbor: undefined,
   position: -1,
};
const PLAYER_FOUR: PlayerData = {
   name: 'Player4',
   role: 'regular',
   dealtCards: [],
   hand: [],
   leftNeighbor: undefined,
   rightNeighbor: undefined,
   position: -1,
};

const DEFAULT_PLAYERS: PlayerData[] = [PLAYER_ONE, PLAYER_TWO, PLAYER_THREE, PLAYER_FOUR];

export { PLAYER_ONE, PLAYER_TWO, PLAYER_THREE, PLAYER_FOUR, DEFAULT_PLAYERS };

const Player = (props: PlayerData) => {
   const { name, role, dealtCards } = props;

   return (
      <div
         key={name}
         // className={`player-card ${role} ${position === currentPlayerIndex ? 'current' : ''}`}
         className={`player-card ${role}`}
      >
         <div className='player-info'>
            <div className='name'>{name}</div>
            <div className='role'>{role}</div>
         </div>
         <div className='cards'>
            {dealtCards.map(({ name: cardName, suit, value, imageFront, imageBack }) => (
               <Card
                  key={cardName}
                  name={cardName}
                  suit={suit}
                  value={value}
                  imageFront={imageFront}
                  imageBack={imageBack}
                  isFaceUp={true} // ! debugging
               />
            ))}
         </div>
      </div>
   );
};

export default Player;

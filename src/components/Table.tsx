import { useState } from 'react';
import type { Player } from '../types/player.types';
import type { DeckOfCards } from '../types/card.types';
import { SUITS, VALUES } from '../types/card.types';
import { shuffleArray } from '../poker/pokerUtils';

export const DECK: DeckOfCards = SUITS.flatMap(suit =>
   VALUES.map(value => ({
      suit,
      value,
      key: `${value}_${suit}`,
      imageFront: `/src/assets/img/cards/${suit}_${value}.png`,
      imageBack: `/src/assets/img/cards/back_light.png`,
      isFaceUp: false,
   })),
);

const PLAYER_ONE: Player = {
   name: 'Player1',
   type: 'dealer',
   dealtCards: [],
   hand: [],
   leftNeighbor: null,
   rightNeighbor: null,
   position: 0,
};
const PLAYER_TWO: Player = {
   name: 'Player2',
   type: 'small-blind',
   dealtCards: [],
   hand: [],
   leftNeighbor: null,
   rightNeighbor: null,
   position: 1,
};
const PLAYER_THREE: Player = {
   name: 'Player3',
   type: 'big-blind',
   dealtCards: [],
   hand: [],
   leftNeighbor: null,
   rightNeighbor: null,
   position: 2,
};
const PLAYER_FOUR: Player = {
   name: 'Player4',
   type: 'regular',
   dealtCards: [],
   hand: [],
   leftNeighbor: null,
   rightNeighbor: null,
   position: 3,
};

const DEFAULT_PLAYERS: Player[] = [PLAYER_ONE, PLAYER_TWO, PLAYER_THREE, PLAYER_FOUR];

// TODO: Implement Draw function.

const Table = () => {
   const [round, setRound] = useState(0);
   const [players, setPlayers] = useState<Player[]>(DEFAULT_PLAYERS);
   const [currentDeck, setCurrentDeck] = useState(DECK);

   const startGame = () => {
      const shuffledDeck = shuffleArray(currentDeck);
      const newPlayers = [...players];

      // TODO: Have better dealing strat
      let cardsDealtCounter = newPlayers.length * 5;
      while (cardsDealtCounter > 0) {
         newPlayers.forEach(player => {
            if (cardsDealtCounter === 0) return;

            player.dealtCards.push(shuffledDeck.pop());
            cardsDealtCounter--;
         });
      }

      setCurrentDeck(shuffledDeck);
      setPlayers(newPlayers);
      setRound(prev => prev + 1);
   };

   return (
      <div id='table'>
         <h2>Round: {round}</h2>
         <button onClick={startGame}>Start Game</button>
         <div className='deck'>
            {currentDeck.map(({ key, suit, value, imageFront, imageBack, isFaceUp }) => {
               return (
                  <div key={key} className={'card deck ' + key}>
                     {key}
                     {<img className={'image front'} src={imageFront} alt={key} />}
                     {<img className={'image back'} src={imageBack} alt={key} />}
                  </div>
               );
            })}
         </div>
         <div className='players'>
            {players.map(({ name, type, dealtCards }, index) => (
               <div key={name} className='player-card'>
                  <div className='name'>{name}</div>
                  <div className='role'>Role: {type}</div>
                  <div className='cards'>
                     Cards:{' '}
                     {dealtCards.map(({ key, imageFront, imageBack }) => (
                        <div key={key} className={'card deck ' + key}>
                           {key}
                           {<img className={'image front'} src={imageFront} alt={key} />}
                           {<img className={'image back'} src={imageBack} alt={key} />}
                        </div>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Table;

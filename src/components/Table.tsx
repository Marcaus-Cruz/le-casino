import { useState } from 'react';
import { shuffleArray } from '../poker/pokerUtils';
import type { Card, DeckOfCards } from '../types/card.types';
import { SUITS, VALUES } from '../types/card.types';
import type { Player } from '../types/player.types';
import type { Table as TableData } from '../types/table.types';
import { DEFAULT_PLAYERS } from './Player.tsx';

export const FRESH_DECK: DeckOfCards = SUITS.flatMap(suit =>
   VALUES.map(value => ({
      suit,
      value,
      key: `${value}_${suit}`,
      imageFront: `/src/assets/img/cards/${suit}_${value}.png`,
      imageBack: `/src/assets/img/cards/back_light.png`,
      isFaceUp: false,
   })),
);

// * Dealer
const dealerDrawCard = (deck: DeckOfCards): Card => {
   const card = deck.pop();
   if (!card) throw new Error('Deck is empty');
   return card;
};
const dealerShuffleDeck = (deck: DeckOfCards): DeckOfCards => shuffleArray(deck);

const playerAddCard = (player: Player, card: Card): void => {
   player.dealtCards.push(card);
};

const tableSetupGame = (players: Player[] = []): TableData => {
   const table: TableData = {
      deck: dealerShuffleDeck(FRESH_DECK),
      roundIndex: 0,
      pot: 0,
      players,
      playerPositions: {},
   };

   players.forEach((player: Player, index: number) => {
      table.playerPositions[index] = player;
      tableSetPlayerPosition(player, index);
   });

   // All Players seated
   players.forEach((player: Player) => playerEstablishNeighbors(player, table.playerPositions));

   return table;
};

const tableSetPlayerPosition = (player: Player, position: number): void => {
   if (!player || position === -1) {
      console.warn('Invalid player or position', { player, position });
      return;
   }

   player.position = position;
};

const playerEstablishNeighbors = (me: Player, playerPositions: Record<number, Player>): void => {
   const { position: myPosition } = me;

   if (myPosition === -1) {
      console.warn('Player is not seated at the table');
      return;
   }

   const lastPosition = Object.keys(playerPositions).length - 1;

   me.rightNeighbor =
      myPosition === 0 ? playerPositions[lastPosition] : playerPositions[myPosition - 1];
   me.leftNeighbor =
      myPosition === lastPosition ? playerPositions[0] : playerPositions[myPosition + 1];
};

const dealCards = (deck: DeckOfCards, players: Player[], numCardsToDeal: number = 5): void => {
   // TODO: Have better dealing strat
   let cardsDealtCounter = players.length * numCardsToDeal;

   while (cardsDealtCounter > 0) {
      players.forEach(player => {
         if (cardsDealtCounter === 0) return;

         playerAddCard(player, dealerDrawCard(deck));
         cardsDealtCounter--;
      });
   }
};

const Table = () => {
   const [tableData, setTableData] = useState<TableData>(tableSetupGame(DEFAULT_PLAYERS));
   const [roundIndex, setRoundIndex] = useState<number>(tableData.roundIndex);
   const [players, setPlayers] = useState<Player[]>(tableData.players);
   const [currentDeck, setCurrentDeck] = useState<DeckOfCards>(tableData.deck);

   const startGame = () => {
      dealCards(tableData.deck, tableData.players);

      setCurrentDeck(tableData.deck);
      setPlayers(tableData.players);
      setRoundIndex(tableData.roundIndex + 1);
   };

   return (
      <div id='table'>
         <h2>Round: {roundIndex}</h2>
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

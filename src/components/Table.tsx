import { useState } from 'react';
import { shuffleArray } from '../poker/pokerUtils';
import type { Card as CardData, DeckOfCards } from '../types/card.types';
import { SUITS, VALUES } from '../types/card.types';
import type { Player } from '../types/player.types';
import type { Table as TableData } from '../types/table.types';
import { DEFAULT_PLAYERS } from './Player.tsx';
import Card, { BACKSIDE_IMAGE } from './Card.tsx';

const FRESH_DECK: DeckOfCards = SUITS.flatMap(suit =>
   VALUES.map(value => ({
      suit,
      value,
      name: `${value}_${suit}`,
      imageFront: `/src/assets/img/cards/${suit}_${value}.png`,
      imageBack: BACKSIDE_IMAGE,
      isFaceUp: false,
   })),
);

// * Dealer
const dealerDrawCard = (deck: DeckOfCards): CardData => {
   const card = deck.pop();
   if (!card) throw new Error('Deck is empty');
   return card;
};
const dealerShuffleDeck = (deck: DeckOfCards): DeckOfCards => shuffleArray(deck);

const tableSetupGame = (players: Player[] = []): TableData => {
   const table: TableData = {
      deck: dealerShuffleDeck(FRESH_DECK),
      roundIndex: 0,
      pot: 0,
      players,
      playerPositions: {},
      currentPlayerIndex: -1,
   };

   players.forEach((player: Player, index: number) => {
      table.playerPositions[index] = player;
      tableSetPlayerPosition(player, index);
      tableSetInitialRole(player);
   });

   // All Players seated
   players.forEach((player: Player) => playerGreetNeighbors(player, table.playerPositions));

   return table;
};

const tableSetInitialRole = (player: Player): void => {
   const { position } = player;

   if (position === 0) {
      player.role = 'dealer';
   } else if (position === 1) {
      player.role = 'big-blind';
   } else if (position === 2) {
      player.role = 'small-blind';
   } else {
      player.role = 'regular';
   }
};

const tableSetPlayerPosition = (player: Player, position: number): void => {
   if (!player || position === -1) {
      console.warn('Invalid player or position', { player, position });
      return;
   }

   player.position = position;
};

const playerAddCard = (player: Player, card: CardData): void => {
   player.dealtCards.push(card);
};

const playerGreetNeighbors = (me: Player, playerPositions: Record<number, Player>): void => {
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

   const submitCards = () => {
      // TODO: Submit cards
   };

   return (
      <div id='table'>
         <div className='round-indicator'>Round: {roundIndex}</div>
         <div className='controls'>
            <button onClick={startGame}>Start Game</button>
            <button onClick={submitCards}>Submit</button>
         </div>
         <div className='deck'>
            {currentDeck.map(({ name: cardName, suit, value, imageFront, imageBack, isFaceUp }) => (
               <Card
                  key={cardName}
                  name={cardName}
                  suit={suit}
                  value={value}
                  imageFront={imageFront}
                  imageBack={imageBack}
                  isFaceUp={isFaceUp}
               />
            ))}
         </div>
         <div className='players'>
            {players.map(({ name, role, dealtCards }) => (
               <div key={name} className='player-card'>
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
            ))}
         </div>
      </div>
   );
};

export default Table;

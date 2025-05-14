import { shuffleArray } from '../poker/utilities.ts';
import type { CardData, DeckOfCardsData } from '../types/card.types';
import { SUITS, VALUES } from '../types/card.types';
import type { PlayerData } from '../types/player.types.ts';
import type { TableData } from '../types/table.types';
import { addToHand, greetNeighbors } from './playerModel.ts';

export const createFreshDeck = (): DeckOfCardsData =>
   SUITS.flatMap(suit =>
      VALUES.map(value => ({
         suit,
         value,
         name: `${value}_${suit}`,
         imageFront: `/src/assets/img/cards/${suit}_${value}.png`,
         imageBack: '/src/assets/img/cards/back_light.png',
         isFaceUp: false,
      })),
   );

export const drawCard = (deck: DeckOfCardsData): CardData => {
   const card = deck.pop();
   if (!card) throw new Error('Deck is empty');
   return card;
};

export const addToDiscardPile = (table: TableData, card: CardData): void => {
   table.discardPile.push(card);
};

export const dealerShuffleDeck = (deck: DeckOfCardsData): DeckOfCardsData => shuffleArray(deck);

export const tableSetupGame = (players: PlayerData[] = []): TableData => {
   const table: TableData = {
      deck: dealerShuffleDeck(createFreshDeck()),
      discardPile: [],
      roundIndex: 0,
      pot: 0,
      players,
      playerPositions: {},
      currentPlayerIndex: -1,
   };

   players.forEach((player: PlayerData, index: number) => {
      table.playerPositions[index] = player;
      tableSetPlayerPosition(player, index);
      tableSetInitialRole(player);
   });

   // All Players seated
   players.forEach((player: PlayerData) => greetNeighbors(player, table.playerPositions));

   return table;
};

export const tableSetInitialRole = (player: PlayerData): void => {
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

export const tableSetPlayerPosition = (player: PlayerData, position: number): void => {
   if (!player || position === -1) {
      console.warn('Invalid player or position', { player, position });
      return;
   }

   player.position = position;
};

export const dealCards = (
   deck: DeckOfCardsData,
   players: PlayerData[],
   numCardsToDeal: number = 5,
): void => {
   let cardsDealtCounter = players.length * numCardsToDeal;

   while (cardsDealtCounter > 0) {
      players.forEach(player => {
         if (cardsDealtCounter === 0) return;

         addToHand(player, drawCard(deck));
         cardsDealtCounter--;
      });
   }
};


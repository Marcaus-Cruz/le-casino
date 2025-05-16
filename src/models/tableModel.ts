import { shuffleArray } from '../poker/utilities.ts';
import type { CardData, DeckOfCardsData } from '../types/card.types';
import { SUITS, VALUES } from '../types/card.types';
import type { PlayerData } from '../types/player.types.ts';
import type { GamePhase, TableData } from '../types/table.types';
import PlayerModel, { DEFAULT_PLAYERS } from './playerModel.ts';

const STARTING_TABLE_DATA: TableData = {
   deck: [],
   players: [],
   discardPile: [],
   roundIndex: -1,
   pot: 0,
   playerPositions: {},
   currentPlayerIndex: -1,
   stage: 'setup',
   playerHasDiscarded: {},
};

class TableModel {
   // TODO: Keep DRY
   deck: DeckOfCardsData = [];
   players: PlayerModel[] = [];
   discardPile: DeckOfCardsData = [];
   roundIndex: number = -1;
   pot: number = 0;
   playerPositions: Record<number, PlayerModel> = {};
   currentPlayerIndex: number = -1;
   stage: GamePhase = 'setup';
   hasPlayerDiscarded: Record<number, boolean> = {};

   constructor() {
      console.log(`[TableModel][constructor]`);

      Object.assign(this, STARTING_TABLE_DATA);
   }

   createFreshDeck(): DeckOfCardsData {
      console.log(`[${TableModel.name}][${this.createFreshDeck.name}]`);

      return SUITS.flatMap(suit =>
         VALUES.map(value => ({
            suit,
            value,
            name: `${value}_${suit}`,
            imageFront: `/src/assets/img/cards/${suit}_${value}.png`,
            imageBack: '/src/assets/img/cards/back_light.png',
            isFaceUp: false,
         })),
      );
   }

   setupGame(players: PlayerData[]): this {
      console.log(`[${TableModel.name}][${this.setupGame.name}]`, { players });

      this.deck = this.shuffleDeck(this.createFreshDeck());

      this.players = players.map((player: PlayerData, index: number) => {
         const newPlayer = new PlayerModel(player);

         this.setPlayerPosition(newPlayer, index);
         this.setInitialRole(newPlayer);

         this.hasPlayerDiscarded[index] = false;

         return newPlayer;
      });

      // All Players seated
      this.players.forEach((player: PlayerModel) => player.greetNeighbors());

      this.roundIndex += 1;
      this.currentPlayerIndex += 1;

      return this;
   }

   setInitialRole(player: PlayerModel): void {
      console.log(`[${TableModel.name}][${this.setInitialRole.name}]`, { player });

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
   }

   setPlayerPosition(player: PlayerModel, position: number): void {
      console.log(`[${TableModel.name}][${this.setPlayerPosition.name}]`, { player });

      if (!player || position === -1) {
         console.warn('Invalid player or position', { player, position });
         return;
      }

      player.position = position;
      this.playerPositions[position] = player;
   }

   /**
    * TODO: Starting with currentPlayerIndex
    * @param numCardsToDeal - number of cards to deal to each player
    */
   dealCards(numCardsToDeal: number = 5): void {
      console.log(`[${TableModel.name}][${this.dealCards.name}]`, { numCardsToDeal });

      let nextToDeal = this.playerPositions[0];

      while (nextToDeal.dealtCards.length < numCardsToDeal) {
         nextToDeal.addToHand(this.drawCard());
         nextToDeal = nextToDeal.leftNeighbor as PlayerModel;
      }
      this.roundIndex += 1; // ! Reducer
      this.stage = 'discarding'; // ! Reducer
   }

   drawCard(): CardData {
      const card = this.deck.pop();
      if (!card) throw new Error('Deck is empty');
      return card;
   }

   addToDiscardPile(cards: CardData[]): CardData[] {
      this.discardPile = [...this.discardPile, ...cards]; // concat or spread? // ! Reducer

      return this.discardPile;
   }

   updateCurrentPlayerIndex(iterator: number): void {
      console.log(`[${TableModel.name}][${this.updateCurrentPlayerIndex.name}]`, { iterator });

      const firstPlayerIndex = 0;
      const lastPlayerIndex = this.players.length - 1;

      // TODO: Use Neighbors
      if (this.currentPlayerIndex === lastPlayerIndex && iterator > 0) {
         this.currentPlayerIndex = firstPlayerIndex;
      } else if (this.currentPlayerIndex === 0 && iterator < 0) {
         this.currentPlayerIndex = lastPlayerIndex;
      } else {
         this.currentPlayerIndex += iterator;
      }
      // ! Reducer
   }

   playerIsDiscarding(cards: CardData[], playerPosition: number): void {
      console.log(`[${TableModel.name}][${this.playerIsDiscarding.name}]`);

      const player = this.playerPositions[playerPosition];
      const numCardsToGiveBack = cards.length;

      this.addToDiscardPile(cards);
      cards.forEach(card => player.removeFromHand(card));

      for (let i = 0; i < numCardsToGiveBack; i += 1) {
         player.addToHand(this.drawCard());
      }
      // ! Reducer

      this.hasPlayerDiscarded[playerPosition] = true;
      // ! Reducer
      this.checkForShowdown();
   }

   checkForShowdown(): void {
      console.log(`[${TableModel.name}][${this.checkForShowdown.name}]`, this.hasPlayerDiscarded);

      if (Object.values(this.hasPlayerDiscarded).every(value => value)) {
         this.stage = 'ready-for-showdown';
         this.currentPlayerIndex = -1;
      } else {
         this.updateCurrentPlayerIndex(1);
      }
      // ! Reducer
   }

   doShowdown(): void {
      console.log(`[${TableModel.name}][${this.doShowdown.name}]`, this);
      this.stage = 'showdown';
   }

   shuffleDeck(deck: DeckOfCardsData): DeckOfCardsData {
      return shuffleArray(deck);
   }
}

export default new TableModel();

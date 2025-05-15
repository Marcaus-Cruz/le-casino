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

   setupGame(players: PlayerData[]): void {
      console.log(`[${TableModel.name}][${this.setupGame.name}]`, { players });

      this.deck = this.shuffleDeck(this.createFreshDeck());

      this.players = players.map((player: PlayerData, index: number) => {
         const newPlayer = new PlayerModel(player);

         this.setPlayerPosition(newPlayer, index);
         this.setInitialRole(newPlayer);

         return newPlayer;
      });

      // All Players seated
      this.players.forEach((player: PlayerModel) => player.greetNeighbors());

      this.roundIndex += 1;
      this.currentPlayerIndex += 1;
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

      let cardsDealtCounter = this.players.length * numCardsToDeal;

      while (cardsDealtCounter > 0) {
         this.players.forEach((player: PlayerModel) => {
            if (cardsDealtCounter === 0) return;

            player.addToHand(this.drawCard());
            cardsDealtCounter--;
         });
      }
   }

   drawCard(): CardData {
      const card = this.deck.pop();
      if (!card) throw new Error('Deck is empty');
      return card;
   }

   addToDiscardPile(cards: CardData[]): CardData[] {
      this.discardPile = [...this.discardPile, ...cards];
      // this.discardPile.push(card);
      return this.discardPile;
   }

   shuffleDeck(deck: DeckOfCardsData): DeckOfCardsData {
      return shuffleArray(deck);
   }
}

export default new TableModel();

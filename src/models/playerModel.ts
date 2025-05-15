import type { CardData } from '../types/card.types';
import type { PlayerData, PlayerRoles } from '../types/player.types';
import TableModel from './tableModel';

const STARTING_PLAYER_DATA: PlayerData = Object.freeze({
   name: '',
   role: 'regular',
   dealtCards: [],
   hand: [],
   leftNeighbor: undefined,
   rightNeighbor: undefined,
   position: -1,
});

const PLAYER_ONE: PlayerData = Object.freeze({ ...STARTING_PLAYER_DATA, name: 'Player1' });
const PLAYER_TWO: PlayerData = Object.freeze({ ...STARTING_PLAYER_DATA, name: 'Player2' });
const PLAYER_THREE: PlayerData = Object.freeze({ ...STARTING_PLAYER_DATA, name: 'Player3' });
const PLAYER_FOUR: PlayerData = Object.freeze({ ...STARTING_PLAYER_DATA, name: 'Player4' });
const DEFAULT_PLAYERS: PlayerData[] = [PLAYER_ONE, PLAYER_TWO, PLAYER_THREE, PLAYER_FOUR];

export { DEFAULT_PLAYERS };

export default class PlayerModel {
   // TODO: Make DRY
   name: string = '';
   role: PlayerRoles = 'regular';
   dealtCards: CardData[] = [];
   hand: CardData[] = [];
   leftNeighbor: PlayerModel | undefined = undefined;
   rightNeighbor: PlayerModel | undefined = undefined;
   position: number = -1;

   /**
    *
    */
   constructor(options: PlayerData) {
      console.log(`[${PlayerModel.name}][constructor]`, { options });

      Object.assign(this, STARTING_PLAYER_DATA, options);
   }

   greetNeighbors(): void {
      console.log(`[${PlayerModel.name}][${this.greetNeighbors.name}]`);

      const { position: myPosition } = this;

      if (myPosition === -1) {
         console.warn('Player is not seated at the table');
         return;
      }

      const lastPosition = Object.keys(TableModel.playerPositions).length - 1;

      this.rightNeighbor =
         myPosition === 0
            ? TableModel.playerPositions[lastPosition]
            : TableModel.playerPositions[myPosition - 1];
      this.leftNeighbor =
         myPosition === lastPosition
            ? TableModel.playerPositions[0]
            : TableModel.playerPositions[myPosition + 1];
   }

   addToHand(card: CardData): CardData[] {
      console.debug(`[${PlayerModel.name}][${this.addToHand.name}]`, { card });

      this.dealtCards.push(card);

      return this.dealtCards;
   }

   removeFromHand(card: CardData): CardData[] {
      console.debug(`[${PlayerModel.name}][${this.removeFromHand.name}]`, { card });

      this.dealtCards = this.dealtCards.filter(keptCard => keptCard.name !== card.name);

      return this.dealtCards;
   }
}

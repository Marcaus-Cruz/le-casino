import type { CardData } from '../types/card.types';
import type { PlayerData } from '../types/player.types';

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

export const playerGreetNeighbors = (
   me: PlayerData,
   playerPositions: Record<number, PlayerData>,
): void => {
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

export const playerAddCard = (player: PlayerData, card: CardData): void => {
   player.dealtCards.push(card);
};

export { DEFAULT_PLAYERS, PLAYER_FOUR, PLAYER_ONE, PLAYER_THREE, PLAYER_TWO };


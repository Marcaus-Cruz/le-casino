import type { CardData } from '../types/card.types';
import type { PlayerData } from '../types/player.types';

const INITIAL_PLAYER_DATA: PlayerData = Object.freeze({
   name: '',
   role: 'regular',
   dealtCards: [],
   hand: undefined,
   leftNeighbor: undefined,
   rightNeighbor: undefined,
   position: -1,
});

const PLAYER_ONE: PlayerData = { ...INITIAL_PLAYER_DATA, name: 'Player1' };
const PLAYER_TWO: PlayerData = { ...INITIAL_PLAYER_DATA, name: 'Player2' };
const PLAYER_THREE: PlayerData = { ...INITIAL_PLAYER_DATA, name: 'Player3' };
const PLAYER_FOUR: PlayerData = { ...INITIAL_PLAYER_DATA, name: 'Player4' };

export const DEFAULT_PLAYERS: PlayerData[] = [PLAYER_ONE, PLAYER_TWO, PLAYER_THREE, PLAYER_FOUR];

export const greetNeighbors = (
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

export const addToHand = (player: PlayerData, card: CardData): void => {
   player.dealtCards.push(card);
};

export const removeFromHand = (player: PlayerData, card: CardData): void => {
   player.dealtCards = player.dealtCards.filter(keptCard => keptCard.name !== card.name);
};

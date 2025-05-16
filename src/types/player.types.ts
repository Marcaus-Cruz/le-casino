import type { CardData } from './card.types';
import type { HandData } from './hand.types';

export type PlayerRoles = 'dealer' | 'big-blind' | 'small-blind' | 'regular';

export type PlayerData = {
   name: string;
   role: PlayerRoles;
   dealtCards: CardData[];
   position: number;
   leftNeighbor?: PlayerData;
   rightNeighbor?: PlayerData;
   hand?: HandData;
   showdownStanding?: number;
};

// const STARTING_PLAYER_DATA: PlayerData = Object.freeze({
//    name: '',
//    role: 'regular',
//    dealtCards: [],
//    hand: [],
//    leftNeighbor: undefined,
//    rightNeighbor: undefined,
//    position: -1,
// });

const PLAYER_ONE: PlayerData = {
   name: 'Player1',
   role: 'regular',
   dealtCards: [],
   hand: undefined,
   leftNeighbor: undefined,
   rightNeighbor: undefined,
   position: -1,
   showdownStanding: undefined,
};
const PLAYER_TWO: PlayerData = {
   name: 'Player2',
   role: 'regular',
   dealtCards: [],
   hand: undefined,
   leftNeighbor: undefined,
   rightNeighbor: undefined,
   position: -1,
   showdownStanding: undefined,
};
const PLAYER_THREE: PlayerData = {
   name: 'Player3',
   role: 'regular',
   dealtCards: [],
   hand: undefined,
   leftNeighbor: undefined,
   rightNeighbor: undefined,
   position: -1,
   showdownStanding: undefined,
};
const PLAYER_FOUR: PlayerData = {
   name: 'Player4',
   role: 'regular',
   dealtCards: [],
   hand: undefined,
   leftNeighbor: undefined,
   rightNeighbor: undefined,
   position: -1,
   showdownStanding: undefined,
};
export const DEFAULT_PLAYERS: PlayerData[] = [PLAYER_ONE, PLAYER_TWO, PLAYER_THREE, PLAYER_FOUR];

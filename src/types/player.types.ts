import { getCopy } from '../poker/utilities';
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

const STARTING_PLAYER_DATA: PlayerData = Object.freeze({
   name: '',
   role: 'regular',
   dealtCards: [],
   position: -1,
   leftNeighbor: undefined,
   rightNeighbor: undefined,
   hand: undefined,
   showdownStanding: undefined,
});

const PLAYER_ONE: PlayerData = { ...getCopy(STARTING_PLAYER_DATA), name: 'Player1' };
const PLAYER_TWO: PlayerData = { ...getCopy(STARTING_PLAYER_DATA), name: 'Player2' };
const PLAYER_THREE: PlayerData = { ...getCopy(STARTING_PLAYER_DATA), name: 'Player3' };
const PLAYER_FOUR: PlayerData = { ...getCopy(STARTING_PLAYER_DATA), name: 'Player4' };
export const DEFAULT_PLAYERS: PlayerData[] = [PLAYER_ONE, PLAYER_TWO, PLAYER_THREE, PLAYER_FOUR];

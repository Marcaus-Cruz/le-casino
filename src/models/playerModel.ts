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

export { DEFAULT_PLAYERS, PLAYER_FOUR, PLAYER_ONE, PLAYER_THREE, PLAYER_TWO };

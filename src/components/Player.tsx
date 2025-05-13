import type { Player } from '../types/player.types';

const PLAYER_ONE: Player = {
   name: 'Player1',
   type: 'regular',
   dealtCards: [],
   hand: [],
   leftNeighbor: undefined,
   rightNeighbor: undefined,
   position: -1,
};
const PLAYER_TWO: Player = {
   name: 'Player2',
   type: 'regular',
   dealtCards: [],
   hand: [],
   leftNeighbor: undefined,
   rightNeighbor: undefined,
   position: -1,
};
const PLAYER_THREE: Player = {
   name: 'Player3',
   type: 'regular',
   dealtCards: [],
   hand: [],
   leftNeighbor: undefined,
   rightNeighbor: undefined,
   position: -1,
};
const PLAYER_FOUR: Player = {
   name: 'Player4',
   type: 'regular',
   dealtCards: [],
   hand: [],
   leftNeighbor: undefined,
   rightNeighbor: undefined,
   position: -1,
};

const DEFAULT_PLAYERS: Player[] = [PLAYER_ONE, PLAYER_TWO, PLAYER_THREE, PLAYER_FOUR];

export { PLAYER_ONE, PLAYER_TWO, PLAYER_THREE, PLAYER_FOUR, DEFAULT_PLAYERS };

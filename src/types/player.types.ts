import type { Card } from './card.types';

export type PlayerTypes = {
   dealer: 'dealer';
   bigBlind: 'big-blind';
   smallBlind: 'small-blind';
   regular: 'regular';
};

export interface Player {
   name: string;
   type: PlayerTypes | string;
   dealtCards: Card[];
   hand: Card[];
   leftNeighbor: Player | null;
   rightNeighbor: Player | null;
   position: number;
}

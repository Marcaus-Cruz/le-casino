import type { Card } from './card.types';

export type PlayerRoles = 'dealer' | 'big-blind' | 'small-blind' | 'regular';

export interface Player {
   name: string;
   role: PlayerRoles;
   dealtCards: Card[];
   hand: Card[];
   position: number;
   leftNeighbor?: Player;
   rightNeighbor?: Player;
}

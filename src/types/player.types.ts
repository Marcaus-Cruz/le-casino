import type { CardData } from './card.types';

export type PlayerRoles = 'dealer' | 'big-blind' | 'small-blind' | 'regular';

export interface PlayerData {
   name: string;
   role: PlayerRoles;
   dealtCards: CardData[];
   hand: CardData[];
   position: number;
   leftNeighbor?: PlayerData;
   rightNeighbor?: PlayerData;
}

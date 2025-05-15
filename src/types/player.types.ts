import type { CardData } from './card.types';
import type { HandData } from './hand.types';

export type PlayerRoles = 'dealer' | 'big-blind' | 'small-blind' | 'regular';

export interface PlayerData {
   name: string;
   role: PlayerRoles;
   dealtCards: CardData[];
   position: number;
   hand?: HandData;
   leftNeighbor?: PlayerData;
   rightNeighbor?: PlayerData;
}

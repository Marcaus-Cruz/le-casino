import type { DeckOfCardsData } from './card.types';
import type { PlayerData } from './player.types';

export type TableData = {
   deck: DeckOfCardsData;
   discardPile: DeckOfCardsData;
   roundIndex: number;
   pot: number;
   playerPositions: Record<number, PlayerData>;
   players: PlayerData[];
   currentPlayerIndex: number;
};

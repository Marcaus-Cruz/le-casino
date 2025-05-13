import type { DeckOfCards } from './card.types';
import type { Player } from './player.types';

export type Table = {
   deck: DeckOfCards;
   roundIndex: number;
   pot: number;
   playerPositions: Record<number, Player>;
   players: Player[];
   currentPlayerIndex: number;
};

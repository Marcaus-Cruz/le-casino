import type { DeckOfCardsData } from './card.types';
import type { PlayerData } from './player.types';

export type GameType = 'draw-five' | 'texas-hold-em' | 'omaha' | 'blackjack' | 'slots' | 'roulette';

export const GAME_TYPES: Record<string, GameType> = Object.freeze({
   drawFive: 'draw-five',
   blackjack: 'blackjack',
   roulette: 'roulette',
   slots: 'slots',
   texasHoldEm: 'texas-hold-em',
   omaha: 'omaha',
});

export type GamePhase = 'setup' | 'betting' | 'discarding' | 'ready-for-showdown' | 'showdown';

export type TableData = {
   deck: DeckOfCardsData;
   discardPile: DeckOfCardsData;
   roundIndex: number;
   pot: number;
   playerPositions: Record<number, PlayerData>;
   players: PlayerData[];
   currentPlayerIndex: number;
   stage: GamePhase;
   playerHasDiscarded: Record<number, boolean>;
   showdownResults?: Record<number, number>;
};

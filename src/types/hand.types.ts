import type { CardData } from './card.types';

export type HandName =
   | 'High-Card'
   | 'Pair'
   | 'Two-Pair'
   | 'Trips'
   | 'Straight'
   | 'Flush'
   | 'Full-House'
   | 'Quads'
   | 'Straight-Flush'
   | 'Royal-Flush';

export const OVERALL_HAND_RANK: Record<HandName, number> = Object.freeze({
   'High-Card': 1,
   Pair: 2,
   'Two-Pair': 3,
   Trips: 4,
   Straight: 5,
   Flush: 6,
   'Full-House': 7,
   Quads: 8,
   'Straight-Flush': 9,
   'Royal-Flush': 10,
});

export type HandData = {
   name: HandName;
   cards: CardData[];
   handRank: number;
   relativeRank: number;
};

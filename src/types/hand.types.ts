import type { Card } from './card.types';

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

export type Hand = {
   name: HandName;
   cards: Card[];
   handRank: number;
   relativeRank: number;
};

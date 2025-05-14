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

export type HandData = {
   name: HandName;
   cards: CardData[];
   handRank: number;
   relativeRank: number;
};

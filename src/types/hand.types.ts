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

export type HandRankData = {
   handRank: number;
   relativeRank: number;
}

export type HandData = HandRankData & {
   name: HandName;
   cards: CardData[];
};

// * Source => ChatGPT
// all possible card values in order, so we can map to 2..14
export const VALUE_ORDER = [
   '2',
   '3',
   '4',
   '5',
   '6',
   '7',
   '8',
   '9',
   '10',
   'J',
   'Q',
   'K',
   'A',
] as const;

export const RANK_MAP: Record<(typeof VALUE_ORDER)[number], number> = VALUE_ORDER.reduce(
   (m, v, i) => {
      m[v] = i + 2;
      return m;
   },
   {} as Record<(typeof VALUE_ORDER)[number], number>,
);

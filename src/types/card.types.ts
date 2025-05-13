export const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'] as const;
export type Suit = (typeof SUITS)[number];

export const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'] as const;
export type Value = (typeof VALUES)[number];

export interface Card {
   key: string;
   suit: Suit;
   value: Value;
   imageFront: string;
   imageBack: string;
   isFaceUp: boolean;
}

export type DeckOfCards = Card[];

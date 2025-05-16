import type { CardData } from '../types/card.types';
import type { HandData, HandName } from '../types/hand.types';
import { OVERALL_HAND_RANK, RANK_MAP } from '../types/hand.types';
import type { PlayerData, PlayerRoles } from '../types/player.types';
import TableModel from './tableModel';

export default class PlayerModel {
   // TODO: Make DRY
   name: string = '';
   role: PlayerRoles = 'regular';
   dealtCards: CardData[] = [];
   hand?: HandData = undefined;
   leftNeighbor?: PlayerModel = undefined;
   rightNeighbor?: PlayerModel = undefined;
   position: number = -1;
   showdownStanding?: number = undefined;

   /**
    *
    */
   constructor(options: PlayerData) {
      console.log(`[${PlayerModel.name}][constructor]`, { options });

      Object.assign(this, options);
   }

   greetNeighbors(): void {
      console.log(`[${PlayerModel.name}][${this.greetNeighbors.name}]`);

      const { position: myPosition } = this;

      if (myPosition === -1) {
         console.warn('Player is not seated at the table');
         return;
      }

      const lastPosition = Object.keys(TableModel.playerPositions).length - 1;

      this.rightNeighbor =
         myPosition === 0
            ? TableModel.playerPositions[lastPosition]
            : TableModel.playerPositions[myPosition - 1];
      this.leftNeighbor =
         myPosition === lastPosition
            ? TableModel.playerPositions[0]
            : TableModel.playerPositions[myPosition + 1];
   }

   addToHand(card: CardData): void {
      console.debug(`[${PlayerModel.name}][${this.addToHand.name}]`, { card });

      this.dealtCards.push(card);
   }

   removeFromHand(card: CardData): void {
      console.debug(`[${PlayerModel.name}][${this.removeFromHand.name}]`, { card });

      this.dealtCards = this.dealtCards.filter(keptCard => keptCard.name !== card.name);
   }

   /**
    * ! Source: ChatGPT
    * 
    * Returns a HandData for any 5-card poker hand.
    * Uses a frequency-then-rank sort to build a unique
    * relativeRank in base-14, so you can break ties
    * (e.g. two Pair of 8’s with different kickers).
    */
   getHandRank(cards: CardData[] = this.dealtCards): HandData {
      if (this.dealtCards.length !== 5) {
         throw new Error('Hand must contain 5 cards');
      }

      // 1. extract numeric ranks and suits
      const ranks = cards.map(c => RANK_MAP[c.value]);
      const suits = cards.map(c => c.suit);

      // 2. build frequency map
      const freq: Record<number, number> = {};
      ranks.forEach(r => {
         freq[r] = (freq[r] || 0) + 1;
      });
      const uniqueRanks = Object.keys(freq).map(x => parseInt(x, 10));

      // 3. detect flush
      const isFlush = suits.every(s => s === suits[0]);

      // 4. detect straight (including the wheel: A-2-3-4-5)
      const sortedUnique = uniqueRanks.slice().sort((a, b) => b - a);
      const wheel = sortedUnique.join(',') === [14, 5, 4, 3, 2].join(',');
      const isStraight =
         uniqueRanks.length === 5 && (wheel || sortedUnique[0] - sortedUnique[4] === 4);
      // high card of the straight (ace counts as 1 in the wheel)
      const straightHigh = wheel ? 5 : sortedUnique[0];

      // 5. sort ranks by (frequency desc, rank desc)
      const freqPairs = uniqueRanks
         .map(r => ({ rank: r, count: freq[r] }))
         .sort((a, b) => (b.count === a.count ? b.rank - a.rank : b.count - a.count));

      // 6. build a length-5 array of ranks, repeating by frequency,
      //    but treating Ace as 1 in a wheel
      const orderedRanks: number[] = [];
      freqPairs.forEach(({ rank, count }) => {
         const useRank = wheel && rank === 14 ? 1 : rank;
         for (let i = 0; i < count; i++) orderedRanks.push(useRank);
      });

      // 7. encode that array into a single number in base-14
      //    for tie-breaking within the same hand category
      const relativeRank = orderedRanks.reduce((acc, r) => acc * 14 + r, 0);

      // 8. figure out which hand it is
      let name: HandName;
      if (isStraight && isFlush) {
         name = straightHigh === 14 ? 'Royal-Flush' : 'Straight-Flush';
      } else if (freqPairs[0].count === 4) {
         name = 'Quads';
      } else if (freqPairs[0].count === 3 && freqPairs[1].count === 2) {
         name = 'Full-House';
      } else if (isFlush) {
         name = 'Flush';
      } else if (isStraight) {
         name = 'Straight';
      } else if (freqPairs[0].count === 3) {
         name = 'Trips';
      } else if (freqPairs[0].count === 2 && freqPairs[1].count === 2) {
         name = 'Two-Pair';
      } else if (freqPairs[0].count === 2) {
         name = 'Pair';
      } else {
         name = 'High-Card';
      }

      this.hand = {
         name,
         cards,
         handRank: OVERALL_HAND_RANK[name],
         relativeRank,
      };

      return this.hand;
   }
}

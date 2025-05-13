// export function getWinningHand(playerHand: string[], dealerHand: string[]): string {
//   // Implement the logic to determine the winning hand
//   return 'Player';
// }
export function shuffleArray<T>(array: T[]): T[] {
   return [...array].sort(() => Math.random() - 0.5);
}
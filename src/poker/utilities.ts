export function shuffleArray<T>(array: T[]): T[] {
   return [...array].sort(() => Math.random() - 0.5);
}

export function wait(ms: number): Promise<void> {
   return new Promise(resolve => setTimeout(resolve, ms));
}

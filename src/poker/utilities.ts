export function shuffleArray<T>(array: T[]): T[] {
   return [...array].sort(() => Math.random() - 0.5);
}

export function wait(ms: number): Promise<void> {
   return new Promise(resolve => setTimeout(resolve, ms));
}

export function isDebug(): boolean {
   return new URLSearchParams(window.location.search).get('debug') === 'true';
}

export function getCopy<T>(obj: T): T {
   return JSON.parse(JSON.stringify(obj));
}

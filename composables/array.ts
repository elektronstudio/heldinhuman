export function nearest(arr: number[], goal: number) {
  return arr.reduce((prev: number, curr: number) =>
    Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev
  );
}

export function uniqueCollection(arr: Record<string, any>, key: string) {
  const result = [];
  const map = new Map();
  for (const item of arr.reverse()) {
    if (!map.has(item[key])) {
      map.set(item[key], true);
      result.push(item);
    }
  }
  return result.reverse();
}
export const unique = (arr: any[]) => [...new Set(arr)];

export function shuffle(arr: any[]) {
  return arr.sort(() => Math.random() - 0.5);
}

export function any(arr: any[]) {
  return shuffle(arr)[0];
}

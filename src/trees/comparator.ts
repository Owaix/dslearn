export type Comparator<T> = (left: T, right: T) => number;

export function defaultCompare<T>(left: T, right: T): number {
  if (left === right || (left !== left && right !== right)) return 0;
  return (left as never) < (right as never) ? -1 : 1;
}

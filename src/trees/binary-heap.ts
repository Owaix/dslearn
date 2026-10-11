import { defaultCompare, type Comparator } from "./comparator.js";

export class BinaryHeap<T> {
  private values: T[] = [];
  private readonly compare: Comparator<T>;

  constructor(compare: Comparator<T> = defaultCompare) {
    this.compare = compare;
  }
  get size(): number {
    return this.values.length;
  }
  insert(value: T): void {
    this.values.push(value);
    this.siftUp(this.values.length - 1);
  }
  peek(): T | undefined {
    return this.values[0];
  }

  extract(): T | undefined {
    if (this.values.length === 0) return undefined;
    const result = this.values[0]!;
    const last = this.values.pop()!;
    if (this.values.length > 0) {
      this.values[0] = last;
      this.siftDown(0);
    }
    return result;
  }

  isEmpty(): boolean {
    return this.values.length === 0;
  }
  clear(): void {
    this.values = [];
  }

  private siftUp(start: number): void {
    let index = start;
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.compare(this.values[index]!, this.values[parent]!) >= 0) return;
      [this.values[index], this.values[parent]] = [this.values[parent]!, this.values[index]!];
      index = parent;
    }
  }

  private siftDown(start: number): void {
    let index = start;
    while (true) {
      const left = index * 2 + 1;
      const right = left + 1;
      let best = index;
      if (left < this.values.length && this.compare(this.values[left]!, this.values[best]!) < 0)
        best = left;
      if (right < this.values.length && this.compare(this.values[right]!, this.values[best]!) < 0)
        best = right;
      if (best === index) return;
      [this.values[index], this.values[best]] = [this.values[best]!, this.values[index]!];
      index = best;
    }
  }
}

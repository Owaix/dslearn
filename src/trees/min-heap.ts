import { BinaryHeap } from "./binary-heap.js";
import { defaultCompare, type Comparator } from "./comparator.js";

export class MinHeap<T> {
  private readonly heap: BinaryHeap<T>;
  constructor(compare: Comparator<T> = defaultCompare) {
    this.heap = new BinaryHeap(compare);
  }
  get size(): number {
    return this.heap.size;
  }
  insert(value: T): void {
    this.heap.insert(value);
  }
  peek(): T | undefined {
    return this.heap.peek();
  }
  extractMin(): T | undefined {
    return this.heap.extract();
  }
  isEmpty(): boolean {
    return this.heap.isEmpty();
  }
  clear(): void {
    this.heap.clear();
  }
}

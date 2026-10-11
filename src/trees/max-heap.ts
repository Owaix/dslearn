import { BinaryHeap } from "./binary-heap.js";
import { defaultCompare, type Comparator } from "./comparator.js";

export class MaxHeap<T> {
  private readonly heap: BinaryHeap<T>;
  constructor(compare: Comparator<T> = defaultCompare) {
    this.heap = new BinaryHeap((left, right) => -compare(left, right));
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
  extractMax(): T | undefined {
    return this.heap.extract();
  }
  isEmpty(): boolean {
    return this.heap.isEmpty();
  }
  clear(): void {
    this.heap.clear();
  }
}

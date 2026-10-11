type Item<T> = { value: T; order: number };
export type Comparator<T> = (left: T, right: T) => number;

export class PriorityQueue<T> implements Iterable<T> {
  private heap: Item<T>[] = [];
  private sequence = 0;
  private readonly compare: Comparator<T>;

  constructor(compare: Comparator<T> = defaultCompare) {
    this.compare = compare;
  }
  get size(): number {
    return this.heap.length;
  }

  enqueue(value: T): void {
    this.heap.push({ value, order: this.sequence++ });
    this.siftUp(this.heap.length - 1);
  }

  dequeue(): T | undefined {
    if (this.heap.length === 0) return undefined;
    const first = this.heap[0]!.value;
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.siftDown(0);
    }
    return first;
  }

  peek(): T | undefined {
    return this.heap[0]?.value;
  }
  isEmpty(): boolean {
    return this.heap.length === 0;
  }
  clear(): void {
    this.heap = [];
  }
  *[Symbol.iterator](): Iterator<T> {
    for (const item of this.heap) yield item.value;
  }

  private compareItems(left: Item<T>, right: Item<T>): number {
    return this.compare(left.value, right.value) || left.order - right.order;
  }

  private siftUp(start: number): void {
    let index = start;
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.compareItems(this.heap[index]!, this.heap[parent]!) >= 0) break;
      [this.heap[index], this.heap[parent]] = [this.heap[parent]!, this.heap[index]!];
      index = parent;
    }
  }

  private siftDown(start: number): void {
    let index = start;
    while (true) {
      const left = index * 2 + 1;
      const right = left + 1;
      let smallest = index;
      if (left < this.heap.length && this.compareItems(this.heap[left]!, this.heap[smallest]!) < 0)
        smallest = left;
      if (
        right < this.heap.length &&
        this.compareItems(this.heap[right]!, this.heap[smallest]!) < 0
      )
        smallest = right;
      if (smallest === index) return;
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest]!, this.heap[index]!];
      index = smallest;
    }
  }
}

function defaultCompare<T>(left: T, right: T): number {
  if (left === right || (left !== left && right !== right)) return 0;
  return (left as never) < (right as never) ? -1 : 1;
}

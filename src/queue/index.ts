export class Queue<T> implements Iterable<T> {
  private buffer: (T | undefined)[] = new Array(8);
  private head = 0;
  private count = 0;

  get size(): number {
    return this.count;
  }

  enqueue(value: T): void {
    if (this.count === this.buffer.length) this.resize();
    this.buffer[(this.head + this.count) % this.buffer.length] = value;
    this.count++;
  }

  dequeue(): T | undefined {
    if (this.count === 0) return undefined;
    const value = this.buffer[this.head];
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this.buffer.length;
    this.count--;
    return value;
  }

  peek(): T | undefined {
    return this.count === 0 ? undefined : this.buffer[this.head];
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  clear(): void {
    this.buffer = new Array(8);
    this.head = 0;
    this.count = 0;
  }

  *[Symbol.iterator](): Iterator<T> {
    for (let index = 0; index < this.count; index++) {
      yield this.buffer[(this.head + index) % this.buffer.length] as T;
    }
  }

  private resize(): void {
    const next = new Array<T | undefined>(this.buffer.length * 2);
    for (let index = 0; index < this.count; index++) {
      next[index] = this.buffer[(this.head + index) % this.buffer.length];
    }
    this.buffer = next;
    this.head = 0;
  }
}

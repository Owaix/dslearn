export class Deque<T> implements Iterable<T> {
  private buffer: (T | undefined)[] = new Array(8);
  private head = 0;
  private count = 0;

  get size(): number {
    return this.count;
  }

  pushFront(value: T): void {
    if (this.count === this.buffer.length) this.resize();
    this.head = (this.head - 1 + this.buffer.length) % this.buffer.length;
    this.buffer[this.head] = value;
    this.count++;
  }

  pushBack(value: T): void {
    if (this.count === this.buffer.length) this.resize();
    this.buffer[(this.head + this.count) % this.buffer.length] = value;
    this.count++;
  }

  popFront(): T | undefined {
    if (this.count === 0) return undefined;
    const value = this.buffer[this.head];
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this.buffer.length;
    this.count--;
    return value;
  }

  popBack(): T | undefined {
    if (this.count === 0) return undefined;
    const index = (this.head + this.count - 1) % this.buffer.length;
    const value = this.buffer[index];
    this.buffer[index] = undefined;
    this.count--;
    return value;
  }

  peekFront(): T | undefined {
    return this.count === 0 ? undefined : this.buffer[this.head];
  }

  peekBack(): T | undefined {
    return this.count === 0
      ? undefined
      : this.buffer[(this.head + this.count - 1) % this.buffer.length];
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

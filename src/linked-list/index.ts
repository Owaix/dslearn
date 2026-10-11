type Node<T> = { value: T; next: Node<T> | null };

export class LinkedList<T> implements Iterable<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private count = 0;

  get size(): number {
    return this.count;
  }

  append(value: T): void {
    const node: Node<T> = { value, next: null };
    if (this.tail) this.tail.next = node;
    else this.head = node;
    this.tail = node;
    this.count++;
  }

  prepend(value: T): void {
    this.head = { value, next: this.head };
    if (!this.tail) this.tail = this.head;
    this.count++;
  }

  insertAt(index: number, value: T): boolean {
    if (!Number.isInteger(index) || index < 0 || index > this.count) return false;
    if (index === 0) this.prepend(value);
    else if (index === this.count) this.append(value);
    else {
      const previous = this.nodeAt(index - 1)!;
      previous.next = { value, next: previous.next };
      this.count++;
    }
    return true;
  }

  remove(value: T): boolean {
    let previous: Node<T> | null = null;
    let current = this.head;
    while (current) {
      if (Object.is(current.value, value)) {
        if (previous) previous.next = current.next;
        else this.head = current.next;
        if (this.tail === current) this.tail = previous;
        this.count--;
        return true;
      }
      previous = current;
      current = current.next;
    }
    return false;
  }

  removeAt(index: number): T | undefined {
    if (!Number.isInteger(index) || index < 0 || index >= this.count) return undefined;
    if (index === 0) {
      const node = this.head!;
      this.head = node.next;
      if (this.count === 1) this.tail = null;
      this.count--;
      return node.value;
    }
    const previous = this.nodeAt(index - 1)!;
    const removed = previous.next!;
    previous.next = removed.next;
    if (this.tail === removed) this.tail = previous;
    this.count--;
    return removed.value;
  }

  find(predicate: (value: T) => boolean): T | undefined {
    for (const value of this) if (predicate(value)) return value;
    return undefined;
  }

  contains(value: T): boolean {
    for (const item of this) if (Object.is(item, value)) return true;
    return false;
  }

  get(index: number): T | undefined {
    if (!Number.isInteger(index) || index < 0 || index >= this.count) return undefined;
    return this.nodeAt(index)!.value;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  toArray(): T[] {
    return [...this];
  }

  *[Symbol.iterator](): Iterator<T> {
    let current = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  private nodeAt(index: number): Node<T> | null {
    let current = this.head;
    for (let position = 0; position < index && current; position++) current = current.next;
    return current;
  }
}

type Node<T> = { value: T; next: Node<T> | null };

export class Stack<T> implements Iterable<T> {
  private topNode: Node<T> | null = null;
  private count = 0;

  get size(): number {
    return this.count;
  }

  push(value: T): void {
    this.topNode = { value, next: this.topNode };
    this.count++;
  }

  pop(): T | undefined {
    if (!this.topNode) return undefined;
    const node = this.topNode;
    this.topNode = node.next;
    this.count--;
    return node.value;
  }

  peek(): T | undefined {
    return this.topNode?.value;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  clear(): void {
    this.topNode = null;
    this.count = 0;
  }

  *[Symbol.iterator](): Iterator<T> {
    let current = this.topNode;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
}

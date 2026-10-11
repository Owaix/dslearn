export class DisjointSet<T> {
  private parent = new Map<T, T>();
  private rank = new Map<T, number>();

  get size(): number {
    return this.parent.size;
  }

  add(value: T): boolean {
    if (this.parent.has(value)) return false;
    this.parent.set(value, value);
    this.rank.set(value, 0);
    return true;
  }

  has(value: T): boolean {
    return this.parent.has(value);
  }

  find(value: T): T | undefined {
    if (!this.parent.has(value)) return undefined;
    const parent = this.parent.get(value)!;
    if (!sameValueZero(parent, value)) this.parent.set(value, this.find(parent)!);
    return this.parent.get(value)!;
  }

  union(left: T, right: T): boolean {
    if (!this.parent.has(left) || !this.parent.has(right)) return false;
    let leftRoot = this.find(left) as T;
    let rightRoot = this.find(right) as T;
    if (sameValueZero(leftRoot, rightRoot)) return false;
    const leftRank = this.rank.get(leftRoot)!;
    const rightRank = this.rank.get(rightRoot)!;
    if (leftRank < rightRank) [leftRoot, rightRoot] = [rightRoot, leftRoot];
    this.parent.set(rightRoot, leftRoot);
    if (leftRank === rightRank) this.rank.set(leftRoot, leftRank + 1);
    return true;
  }

  connected(left: T, right: T): boolean {
    if (!this.parent.has(left) || !this.parent.has(right)) return false;
    return sameValueZero(this.find(left), this.find(right));
  }

  clear(): void {
    this.parent.clear();
    this.rank.clear();
  }
}

function sameValueZero<T>(left: T, right: T): boolean {
  return left === right || (left !== left && right !== right);
}

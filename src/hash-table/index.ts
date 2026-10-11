type Entry<K, V> = { key: K; value: V };
export type HashFunction<K> = (key: K) => number;

export class HashTable<K, V> implements Iterable<[K, V]> {
  private buckets: Entry<K, V>[][];
  private count = 0;
  private readonly initialCapacity: number;
  private readonly hashFunction: HashFunction<K>;
  private readonly objectIds = new WeakMap<object, number>();
  private readonly symbolIds = new Map<symbol, number>();
  private nextIdentity = 1;

  constructor(initialCapacity = 16, hashFunction?: HashFunction<K>) {
    if (!Number.isInteger(initialCapacity) || initialCapacity < 1) {
      throw new RangeError("initialCapacity must be a positive integer");
    }
    this.initialCapacity = initialCapacity;
    this.buckets = Array.from({ length: initialCapacity }, () => []);
    this.hashFunction = hashFunction ?? ((key: K) => this.defaultHash(key));
  }

  get size(): number {
    return this.count;
  }

  set(key: K, value: V): this {
    const bucket = this.buckets[this.indexFor(key)]!;
    const existing = bucket.find((entry) => this.equals(entry.key, key));
    if (existing) {
      existing.value = value;
      return this;
    }
    bucket.push({ key, value });
    this.count++;
    if (this.count / this.buckets.length > 0.75) this.resize(this.buckets.length * 2);
    return this;
  }

  get(key: K): V | undefined {
    return this.buckets[this.indexFor(key)]!.find((entry) => this.equals(entry.key, key))?.value;
  }

  has(key: K): boolean {
    return this.buckets[this.indexFor(key)]!.some((entry) => this.equals(entry.key, key));
  }

  delete(key: K): boolean {
    const bucket = this.buckets[this.indexFor(key)]!;
    const index = bucket.findIndex((entry) => this.equals(entry.key, key));
    if (index < 0) return false;
    bucket.splice(index, 1);
    this.count--;
    return true;
  }

  clear(): void {
    this.buckets = Array.from({ length: this.initialCapacity }, () => []);
    this.count = 0;
  }

  *keys(): IterableIterator<K> {
    for (const bucket of this.buckets) for (const entry of bucket) yield entry.key;
  }

  *values(): IterableIterator<V> {
    for (const bucket of this.buckets) for (const entry of bucket) yield entry.value;
  }

  *entries(): IterableIterator<[K, V]> {
    for (const bucket of this.buckets) for (const entry of bucket) yield [entry.key, entry.value];
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.entries();
  }

  private indexFor(key: K): number {
    const hash = this.hashFunction(key);
    if (!Number.isFinite(hash)) throw new RangeError("hashFunction must return a finite number");
    return ((Math.trunc(hash) % this.buckets.length) + this.buckets.length) % this.buckets.length;
  }

  private resize(capacity: number): void {
    const entries = [...this.entries()];
    this.buckets = Array.from({ length: capacity }, () => []);
    for (const [key, value] of entries) this.buckets[this.indexFor(key)]!.push({ key, value });
  }

  private equals(left: K, right: K): boolean {
    return left === right || (left !== left && right !== right);
  }

  private defaultHash(key: K): number {
    let text: string;
    if (key === null) text = "null";
    else if (typeof key === "object" || typeof key === "function") {
      const objectKey = key as object;
      let id = this.objectIds.get(objectKey);
      if (id === undefined) {
        id = this.nextIdentity++;
        this.objectIds.set(objectKey, id);
      }
      return id;
    } else if (typeof key === "symbol") {
      let id = this.symbolIds.get(key);
      if (id === undefined) {
        id = this.nextIdentity++;
        this.symbolIds.set(key, id);
      }
      return id;
    } else if (typeof key === "number") text = `number:${key === 0 ? 0 : key}`;
    else text = `${typeof key}:${String(key)}`;
    let hash = 2166136261;
    for (let index = 0; index < text.length; index++) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }
}

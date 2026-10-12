export type HashFunction<K> = (key: K) => number;
export declare class HashTable<K, V> implements Iterable<[K, V]> {
    private buckets;
    private count;
    private readonly initialCapacity;
    private readonly hashFunction;
    private readonly objectIds;
    private readonly symbolIds;
    private nextIdentity;
    constructor(initialCapacity?: number, hashFunction?: HashFunction<K>);
    get size(): number;
    set(key: K, value: V): this;
    get(key: K): V | undefined;
    has(key: K): boolean;
    delete(key: K): boolean;
    clear(): void;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    entries(): IterableIterator<[K, V]>;
    [Symbol.iterator](): IterableIterator<[K, V]>;
    private indexFor;
    private resize;
    private equals;
    private defaultHash;
}

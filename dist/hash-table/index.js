export class HashTable {
    buckets;
    count = 0;
    initialCapacity;
    hashFunction;
    objectIds = new WeakMap();
    symbolIds = new Map();
    nextIdentity = 1;
    constructor(initialCapacity = 16, hashFunction) {
        if (!Number.isInteger(initialCapacity) || initialCapacity < 1) {
            throw new RangeError("initialCapacity must be a positive integer");
        }
        this.initialCapacity = initialCapacity;
        this.buckets = Array.from({ length: initialCapacity }, () => []);
        this.hashFunction = hashFunction ?? ((key) => this.defaultHash(key));
    }
    get size() {
        return this.count;
    }
    set(key, value) {
        const bucket = this.buckets[this.indexFor(key)];
        const existing = bucket.find((entry) => this.equals(entry.key, key));
        if (existing) {
            existing.value = value;
            return this;
        }
        bucket.push({ key, value });
        this.count++;
        if (this.count / this.buckets.length > 0.75)
            this.resize(this.buckets.length * 2);
        return this;
    }
    get(key) {
        return this.buckets[this.indexFor(key)].find((entry) => this.equals(entry.key, key))?.value;
    }
    has(key) {
        return this.buckets[this.indexFor(key)].some((entry) => this.equals(entry.key, key));
    }
    delete(key) {
        const bucket = this.buckets[this.indexFor(key)];
        const index = bucket.findIndex((entry) => this.equals(entry.key, key));
        if (index < 0)
            return false;
        bucket.splice(index, 1);
        this.count--;
        return true;
    }
    clear() {
        this.buckets = Array.from({ length: this.initialCapacity }, () => []);
        this.count = 0;
    }
    *keys() {
        for (const bucket of this.buckets)
            for (const entry of bucket)
                yield entry.key;
    }
    *values() {
        for (const bucket of this.buckets)
            for (const entry of bucket)
                yield entry.value;
    }
    *entries() {
        for (const bucket of this.buckets)
            for (const entry of bucket)
                yield [entry.key, entry.value];
    }
    [Symbol.iterator]() {
        return this.entries();
    }
    indexFor(key) {
        const hash = this.hashFunction(key);
        if (!Number.isFinite(hash))
            throw new RangeError("hashFunction must return a finite number");
        return ((Math.trunc(hash) % this.buckets.length) + this.buckets.length) % this.buckets.length;
    }
    resize(capacity) {
        const entries = [...this.entries()];
        this.buckets = Array.from({ length: capacity }, () => []);
        for (const [key, value] of entries)
            this.buckets[this.indexFor(key)].push({ key, value });
    }
    equals(left, right) {
        return left === right || (left !== left && right !== right);
    }
    defaultHash(key) {
        let text;
        if (key === null)
            text = "null";
        else if (typeof key === "object" || typeof key === "function") {
            const objectKey = key;
            let id = this.objectIds.get(objectKey);
            if (id === undefined) {
                id = this.nextIdentity++;
                this.objectIds.set(objectKey, id);
            }
            return id;
        }
        else if (typeof key === "symbol") {
            let id = this.symbolIds.get(key);
            if (id === undefined) {
                id = this.nextIdentity++;
                this.symbolIds.set(key, id);
            }
            return id;
        }
        else if (typeof key === "number")
            text = `number:${key === 0 ? 0 : key}`;
        else
            text = `${typeof key}:${String(key)}`;
        let hash = 2166136261;
        for (let index = 0; index < text.length; index++) {
            hash ^= text.charCodeAt(index);
            hash = Math.imul(hash, 16777619);
        }
        return hash >>> 0;
    }
}

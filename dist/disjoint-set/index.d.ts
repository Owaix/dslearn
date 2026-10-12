export declare class DisjointSet<T> {
    private parent;
    private rank;
    get size(): number;
    add(value: T): boolean;
    has(value: T): boolean;
    find(value: T): T | undefined;
    union(left: T, right: T): boolean;
    connected(left: T, right: T): boolean;
    clear(): void;
}

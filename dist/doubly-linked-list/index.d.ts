export declare class DoublyLinkedList<T> implements Iterable<T> {
    private head;
    private tail;
    private count;
    get size(): number;
    append(value: T): void;
    prepend(value: T): void;
    insertAt(index: number, value: T): boolean;
    remove(value: T): boolean;
    removeAt(index: number): T | undefined;
    find(predicate: (value: T) => boolean): T | undefined;
    contains(value: T): boolean;
    get(index: number): T | undefined;
    clear(): void;
    toArray(): T[];
    [Symbol.iterator](): Iterator<T>;
    private nodeAt;
    private unlink;
}

export declare class Deque<T> implements Iterable<T> {
    private buffer;
    private head;
    private count;
    get size(): number;
    pushFront(value: T): void;
    pushBack(value: T): void;
    popFront(): T | undefined;
    popBack(): T | undefined;
    peekFront(): T | undefined;
    peekBack(): T | undefined;
    isEmpty(): boolean;
    clear(): void;
    [Symbol.iterator](): Iterator<T>;
    private resize;
}

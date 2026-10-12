export declare class Queue<T> implements Iterable<T> {
    private buffer;
    private head;
    private count;
    get size(): number;
    enqueue(value: T): void;
    dequeue(): T | undefined;
    peek(): T | undefined;
    isEmpty(): boolean;
    clear(): void;
    [Symbol.iterator](): Iterator<T>;
    private resize;
}

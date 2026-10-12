export type Comparator<T> = (left: T, right: T) => number;
export declare class PriorityQueue<T> implements Iterable<T> {
    private heap;
    private sequence;
    private readonly compare;
    constructor(compare?: Comparator<T>);
    get size(): number;
    enqueue(value: T): void;
    dequeue(): T | undefined;
    peek(): T | undefined;
    isEmpty(): boolean;
    clear(): void;
    [Symbol.iterator](): Iterator<T>;
    private compareItems;
    private siftUp;
    private siftDown;
}

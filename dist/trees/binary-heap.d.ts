import { type Comparator } from "./comparator.js";
export declare class BinaryHeap<T> {
    private values;
    private readonly compare;
    constructor(compare?: Comparator<T>);
    get size(): number;
    insert(value: T): void;
    peek(): T | undefined;
    extract(): T | undefined;
    isEmpty(): boolean;
    clear(): void;
    private siftUp;
    private siftDown;
}

import { type Comparator } from "./comparator.js";
export declare class MaxHeap<T> {
    private readonly heap;
    constructor(compare?: Comparator<T>);
    get size(): number;
    insert(value: T): void;
    peek(): T | undefined;
    extractMax(): T | undefined;
    isEmpty(): boolean;
    clear(): void;
}

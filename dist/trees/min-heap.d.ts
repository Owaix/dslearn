import { type Comparator } from "./comparator.js";
export declare class MinHeap<T> {
    private readonly heap;
    constructor(compare?: Comparator<T>);
    get size(): number;
    insert(value: T): void;
    peek(): T | undefined;
    extractMin(): T | undefined;
    isEmpty(): boolean;
    clear(): void;
}

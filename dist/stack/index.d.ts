export declare class Stack<T> implements Iterable<T> {
    private topNode;
    private count;
    get size(): number;
    push(value: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    isEmpty(): boolean;
    clear(): void;
    [Symbol.iterator](): Iterator<T>;
}

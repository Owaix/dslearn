import { type Comparator } from "./comparator.js";
export declare class BinarySearchTree<T> {
    private root;
    private count;
    private readonly compare;
    constructor(compare?: Comparator<T>);
    get size(): number;
    insert(value: T): boolean;
    search(value: T): T | undefined;
    contains(value: T): boolean;
    delete(value: T): boolean;
    inOrderTraversal(): T[];
    preOrderTraversal(): T[];
    postOrderTraversal(): T[];
    levelOrderTraversal(): T[];
    clear(): void;
}

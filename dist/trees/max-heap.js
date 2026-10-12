import { BinaryHeap } from "./binary-heap.js";
import { defaultCompare } from "./comparator.js";
export class MaxHeap {
    heap;
    constructor(compare = defaultCompare) {
        this.heap = new BinaryHeap((left, right) => -compare(left, right));
    }
    get size() {
        return this.heap.size;
    }
    insert(value) {
        this.heap.insert(value);
    }
    peek() {
        return this.heap.peek();
    }
    extractMax() {
        return this.heap.extract();
    }
    isEmpty() {
        return this.heap.isEmpty();
    }
    clear() {
        this.heap.clear();
    }
}

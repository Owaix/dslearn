import { BinaryHeap } from "./binary-heap.js";
import { defaultCompare } from "./comparator.js";
export class MinHeap {
    heap;
    constructor(compare = defaultCompare) {
        this.heap = new BinaryHeap(compare);
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
    extractMin() {
        return this.heap.extract();
    }
    isEmpty() {
        return this.heap.isEmpty();
    }
    clear() {
        this.heap.clear();
    }
}

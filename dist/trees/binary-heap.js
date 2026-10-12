import { defaultCompare } from "./comparator.js";
export class BinaryHeap {
    values = [];
    compare;
    constructor(compare = defaultCompare) {
        this.compare = compare;
    }
    get size() {
        return this.values.length;
    }
    insert(value) {
        this.values.push(value);
        this.siftUp(this.values.length - 1);
    }
    peek() {
        return this.values[0];
    }
    extract() {
        if (this.values.length === 0)
            return undefined;
        const result = this.values[0];
        const last = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = last;
            this.siftDown(0);
        }
        return result;
    }
    isEmpty() {
        return this.values.length === 0;
    }
    clear() {
        this.values = [];
    }
    siftUp(start) {
        let index = start;
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.compare(this.values[index], this.values[parent]) >= 0)
                return;
            [this.values[index], this.values[parent]] = [this.values[parent], this.values[index]];
            index = parent;
        }
    }
    siftDown(start) {
        let index = start;
        while (true) {
            const left = index * 2 + 1;
            const right = left + 1;
            let best = index;
            if (left < this.values.length && this.compare(this.values[left], this.values[best]) < 0)
                best = left;
            if (right < this.values.length && this.compare(this.values[right], this.values[best]) < 0)
                best = right;
            if (best === index)
                return;
            [this.values[index], this.values[best]] = [this.values[best], this.values[index]];
            index = best;
        }
    }
}

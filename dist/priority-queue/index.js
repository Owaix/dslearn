export class PriorityQueue {
    heap = [];
    sequence = 0;
    compare;
    constructor(compare = defaultCompare) {
        this.compare = compare;
    }
    get size() {
        return this.heap.length;
    }
    enqueue(value) {
        this.heap.push({ value, order: this.sequence++ });
        this.siftUp(this.heap.length - 1);
    }
    dequeue() {
        if (this.heap.length === 0)
            return undefined;
        const first = this.heap[0].value;
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.siftDown(0);
        }
        return first;
    }
    peek() {
        return this.heap[0]?.value;
    }
    isEmpty() {
        return this.heap.length === 0;
    }
    clear() {
        this.heap = [];
    }
    *[Symbol.iterator]() {
        for (const item of this.heap)
            yield item.value;
    }
    compareItems(left, right) {
        return this.compare(left.value, right.value) || left.order - right.order;
    }
    siftUp(start) {
        let index = start;
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.compareItems(this.heap[index], this.heap[parent]) >= 0)
                break;
            [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
            index = parent;
        }
    }
    siftDown(start) {
        let index = start;
        while (true) {
            const left = index * 2 + 1;
            const right = left + 1;
            let smallest = index;
            if (left < this.heap.length && this.compareItems(this.heap[left], this.heap[smallest]) < 0)
                smallest = left;
            if (right < this.heap.length &&
                this.compareItems(this.heap[right], this.heap[smallest]) < 0)
                smallest = right;
            if (smallest === index)
                return;
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}
function defaultCompare(left, right) {
    if (left === right || (left !== left && right !== right))
        return 0;
    return left < right ? -1 : 1;
}

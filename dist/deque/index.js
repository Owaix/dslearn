export class Deque {
    buffer = new Array(8);
    head = 0;
    count = 0;
    get size() {
        return this.count;
    }
    pushFront(value) {
        if (this.count === this.buffer.length)
            this.resize();
        this.head = (this.head - 1 + this.buffer.length) % this.buffer.length;
        this.buffer[this.head] = value;
        this.count++;
    }
    pushBack(value) {
        if (this.count === this.buffer.length)
            this.resize();
        this.buffer[(this.head + this.count) % this.buffer.length] = value;
        this.count++;
    }
    popFront() {
        if (this.count === 0)
            return undefined;
        const value = this.buffer[this.head];
        this.buffer[this.head] = undefined;
        this.head = (this.head + 1) % this.buffer.length;
        this.count--;
        return value;
    }
    popBack() {
        if (this.count === 0)
            return undefined;
        const index = (this.head + this.count - 1) % this.buffer.length;
        const value = this.buffer[index];
        this.buffer[index] = undefined;
        this.count--;
        return value;
    }
    peekFront() {
        return this.count === 0 ? undefined : this.buffer[this.head];
    }
    peekBack() {
        return this.count === 0
            ? undefined
            : this.buffer[(this.head + this.count - 1) % this.buffer.length];
    }
    isEmpty() {
        return this.count === 0;
    }
    clear() {
        this.buffer = new Array(8);
        this.head = 0;
        this.count = 0;
    }
    *[Symbol.iterator]() {
        for (let index = 0; index < this.count; index++) {
            yield this.buffer[(this.head + index) % this.buffer.length];
        }
    }
    resize() {
        const next = new Array(this.buffer.length * 2);
        for (let index = 0; index < this.count; index++) {
            next[index] = this.buffer[(this.head + index) % this.buffer.length];
        }
        this.buffer = next;
        this.head = 0;
    }
}

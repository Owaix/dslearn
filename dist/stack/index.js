export class Stack {
    topNode = null;
    count = 0;
    get size() {
        return this.count;
    }
    push(value) {
        this.topNode = { value, next: this.topNode };
        this.count++;
    }
    pop() {
        if (!this.topNode)
            return undefined;
        const node = this.topNode;
        this.topNode = node.next;
        this.count--;
        return node.value;
    }
    peek() {
        return this.topNode?.value;
    }
    isEmpty() {
        return this.count === 0;
    }
    clear() {
        this.topNode = null;
        this.count = 0;
    }
    *[Symbol.iterator]() {
        let current = this.topNode;
        while (current) {
            yield current.value;
            current = current.next;
        }
    }
}

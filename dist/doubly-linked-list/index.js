export class DoublyLinkedList {
    head = null;
    tail = null;
    count = 0;
    get size() {
        return this.count;
    }
    append(value) {
        const node = { value, next: null, previous: this.tail };
        if (this.tail)
            this.tail.next = node;
        else
            this.head = node;
        this.tail = node;
        this.count++;
    }
    prepend(value) {
        const node = { value, next: this.head, previous: null };
        if (this.head)
            this.head.previous = node;
        else
            this.tail = node;
        this.head = node;
        this.count++;
    }
    insertAt(index, value) {
        if (!Number.isInteger(index) || index < 0 || index > this.count)
            return false;
        if (index === 0)
            this.prepend(value);
        else if (index === this.count)
            this.append(value);
        else {
            const next = this.nodeAt(index);
            const node = { value, next, previous: next.previous };
            next.previous.next = node;
            next.previous = node;
            this.count++;
        }
        return true;
    }
    remove(value) {
        let current = this.head;
        while (current) {
            if (Object.is(current.value, value)) {
                this.unlink(current);
                return true;
            }
            current = current.next;
        }
        return false;
    }
    removeAt(index) {
        if (!Number.isInteger(index) || index < 0 || index >= this.count)
            return undefined;
        const node = this.nodeAt(index);
        this.unlink(node);
        return node.value;
    }
    find(predicate) {
        for (const value of this)
            if (predicate(value))
                return value;
        return undefined;
    }
    contains(value) {
        for (const item of this)
            if (Object.is(item, value))
                return true;
        return false;
    }
    get(index) {
        if (!Number.isInteger(index) || index < 0 || index >= this.count)
            return undefined;
        return this.nodeAt(index).value;
    }
    clear() {
        this.head = null;
        this.tail = null;
        this.count = 0;
    }
    toArray() {
        return [...this];
    }
    *[Symbol.iterator]() {
        let current = this.head;
        while (current) {
            yield current.value;
            current = current.next;
        }
    }
    nodeAt(index) {
        if (index < this.count / 2) {
            let current = this.head;
            for (let position = 0; position < index && current; position++)
                current = current.next;
            return current;
        }
        let current = this.tail;
        for (let position = this.count - 1; position > index && current; position--)
            current = current.previous;
        return current;
    }
    unlink(node) {
        if (node.previous)
            node.previous.next = node.next;
        else
            this.head = node.next;
        if (node.next)
            node.next.previous = node.previous;
        else
            this.tail = node.previous;
        this.count--;
    }
}

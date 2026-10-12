export class LinkedList {
    head = null;
    tail = null;
    count = 0;
    get size() {
        return this.count;
    }
    append(value) {
        const node = { value, next: null };
        if (this.tail)
            this.tail.next = node;
        else
            this.head = node;
        this.tail = node;
        this.count++;
    }
    prepend(value) {
        this.head = { value, next: this.head };
        if (!this.tail)
            this.tail = this.head;
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
            const previous = this.nodeAt(index - 1);
            previous.next = { value, next: previous.next };
            this.count++;
        }
        return true;
    }
    remove(value) {
        let previous = null;
        let current = this.head;
        while (current) {
            if (Object.is(current.value, value)) {
                if (previous)
                    previous.next = current.next;
                else
                    this.head = current.next;
                if (this.tail === current)
                    this.tail = previous;
                this.count--;
                return true;
            }
            previous = current;
            current = current.next;
        }
        return false;
    }
    removeAt(index) {
        if (!Number.isInteger(index) || index < 0 || index >= this.count)
            return undefined;
        if (index === 0) {
            const node = this.head;
            this.head = node.next;
            if (this.count === 1)
                this.tail = null;
            this.count--;
            return node.value;
        }
        const previous = this.nodeAt(index - 1);
        const removed = previous.next;
        previous.next = removed.next;
        if (this.tail === removed)
            this.tail = previous;
        this.count--;
        return removed.value;
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
        let current = this.head;
        for (let position = 0; position < index && current; position++)
            current = current.next;
        return current;
    }
}

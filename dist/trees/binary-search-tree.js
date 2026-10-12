import { defaultCompare } from "./comparator.js";
export class BinarySearchTree {
    root = null;
    count = 0;
    compare;
    constructor(compare = defaultCompare) {
        this.compare = compare;
    }
    get size() {
        return this.count;
    }
    insert(value) {
        const add = (node) => {
            if (!node) {
                this.count++;
                return { value, left: null, right: null };
            }
            const order = this.compare(value, node.value);
            if (order === 0)
                return node;
            if (order < 0)
                node.left = add(node.left);
            else
                node.right = add(node.right);
            return node;
        };
        const before = this.count;
        this.root = add(this.root);
        return this.count !== before;
    }
    search(value) {
        let current = this.root;
        while (current) {
            const order = this.compare(value, current.value);
            if (order === 0)
                return current.value;
            current = order < 0 ? current.left : current.right;
        }
        return undefined;
    }
    contains(value) {
        let current = this.root;
        while (current) {
            const order = this.compare(value, current.value);
            if (order === 0)
                return true;
            current = order < 0 ? current.left : current.right;
        }
        return false;
    }
    delete(value) {
        let removed = false;
        const removeSuccessor = (node) => {
            if (!node.left)
                return node.right;
            node.left = removeSuccessor(node.left);
            return node;
        };
        const remove = (node) => {
            if (!node)
                return null;
            const order = this.compare(value, node.value);
            if (order < 0)
                node.left = remove(node.left);
            else if (order > 0)
                node.right = remove(node.right);
            else {
                removed = true;
                if (!node.left)
                    return node.right;
                if (!node.right)
                    return node.left;
                let successor = node.right;
                while (successor.left)
                    successor = successor.left;
                node.value = successor.value;
                node.right = removeSuccessor(node.right);
            }
            return node;
        };
        this.root = remove(this.root);
        if (removed)
            this.count--;
        return removed;
    }
    inOrderTraversal() {
        const result = [];
        const visit = (node) => {
            if (!node)
                return;
            visit(node.left);
            result.push(node.value);
            visit(node.right);
        };
        visit(this.root);
        return result;
    }
    preOrderTraversal() {
        const result = [];
        const visit = (node) => {
            if (!node)
                return;
            result.push(node.value);
            visit(node.left);
            visit(node.right);
        };
        visit(this.root);
        return result;
    }
    postOrderTraversal() {
        const result = [];
        const visit = (node) => {
            if (!node)
                return;
            visit(node.left);
            visit(node.right);
            result.push(node.value);
        };
        visit(this.root);
        return result;
    }
    levelOrderTraversal() {
        if (!this.root)
            return [];
        const result = [];
        const queue = [this.root];
        for (let index = 0; index < queue.length; index++) {
            const node = queue[index];
            result.push(node.value);
            if (node.left)
                queue.push(node.left);
            if (node.right)
                queue.push(node.right);
        }
        return result;
    }
    clear() {
        this.root = null;
        this.count = 0;
    }
}

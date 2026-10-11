import { defaultCompare, type Comparator } from "./comparator.js";

type Node<T> = { value: T; left: Node<T> | null; right: Node<T> | null };

export class BinarySearchTree<T> {
  private root: Node<T> | null = null;
  private count = 0;
  private readonly compare: Comparator<T>;

  constructor(compare: Comparator<T> = defaultCompare) {
    this.compare = compare;
  }
  get size(): number {
    return this.count;
  }

  insert(value: T): boolean {
    const add = (node: Node<T> | null): Node<T> => {
      if (!node) {
        this.count++;
        return { value, left: null, right: null };
      }
      const order = this.compare(value, node.value);
      if (order === 0) return node;
      if (order < 0) node.left = add(node.left);
      else node.right = add(node.right);
      return node;
    };
    const before = this.count;
    this.root = add(this.root);
    return this.count !== before;
  }

  search(value: T): T | undefined {
    let current = this.root;
    while (current) {
      const order = this.compare(value, current.value);
      if (order === 0) return current.value;
      current = order < 0 ? current.left : current.right;
    }
    return undefined;
  }

  contains(value: T): boolean {
    let current = this.root;
    while (current) {
      const order = this.compare(value, current.value);
      if (order === 0) return true;
      current = order < 0 ? current.left : current.right;
    }
    return false;
  }

  delete(value: T): boolean {
    let removed = false;
    const removeSuccessor = (node: Node<T>): Node<T> | null => {
      if (!node.left) return node.right;
      node.left = removeSuccessor(node.left);
      return node;
    };
    const remove = (node: Node<T> | null): Node<T> | null => {
      if (!node) return null;
      const order = this.compare(value, node.value);
      if (order < 0) node.left = remove(node.left);
      else if (order > 0) node.right = remove(node.right);
      else {
        removed = true;
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        let successor = node.right;
        while (successor.left) successor = successor.left;
        node.value = successor.value;
        node.right = removeSuccessor(node.right);
      }
      return node;
    };
    this.root = remove(this.root);
    if (removed) this.count--;
    return removed;
  }

  inOrderTraversal(): T[] {
    const result: T[] = [];
    const visit = (node: Node<T> | null): void => {
      if (!node) return;
      visit(node.left);
      result.push(node.value);
      visit(node.right);
    };
    visit(this.root);
    return result;
  }

  preOrderTraversal(): T[] {
    const result: T[] = [];
    const visit = (node: Node<T> | null): void => {
      if (!node) return;
      result.push(node.value);
      visit(node.left);
      visit(node.right);
    };
    visit(this.root);
    return result;
  }

  postOrderTraversal(): T[] {
    const result: T[] = [];
    const visit = (node: Node<T> | null): void => {
      if (!node) return;
      visit(node.left);
      visit(node.right);
      result.push(node.value);
    };
    visit(this.root);
    return result;
  }

  levelOrderTraversal(): T[] {
    if (!this.root) return [];
    const result: T[] = [];
    const queue: Node<T>[] = [this.root];
    for (let index = 0; index < queue.length; index++) {
      const node = queue[index]!;
      result.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return result;
  }

  clear(): void {
    this.root = null;
    this.count = 0;
  }
}

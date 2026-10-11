import { describe, expect, it } from "vitest";
import { BinarySearchTree, MaxHeap, MinHeap } from "../src/index.js";

describe("BinarySearchTree", () => {
  it("traverses, searches, ignores comparator-equal duplicates, and clears", () => {
    const tree = new BinarySearchTree<number>();
    expect(tree.search(1)).toBeUndefined();
    expect(tree.contains(1)).toBe(false);
    expect(tree.delete(1)).toBe(false);
    expect(tree.inOrderTraversal()).toEqual([]);
    for (const value of [5, 3, 7, 2, 4, 6, 8]) expect(tree.insert(value)).toBe(true);
    expect(tree.insert(5)).toBe(false);
    expect(tree.size).toBe(7);
    expect(tree.search(6)).toBe(6);
    expect(tree.contains(4)).toBe(true);
    expect(tree.inOrderTraversal()).toEqual([2, 3, 4, 5, 6, 7, 8]);
    expect(tree.preOrderTraversal()).toEqual([5, 3, 2, 4, 7, 6, 8]);
    expect(tree.postOrderTraversal()).toEqual([2, 4, 3, 6, 8, 7, 5]);
    expect(tree.levelOrderTraversal()).toEqual([5, 3, 7, 2, 4, 6, 8]);
    tree.clear();
    expect(tree.size).toBe(0);
    expect(tree.levelOrderTraversal()).toEqual([]);
  });

  it("deletes leaves, one-child nodes, and two-child nodes", () => {
    const tree = new BinarySearchTree<number>();
    for (const value of [10, 5, 15, 3, 7, 12, 18, 11]) tree.insert(value);
    expect(tree.delete(3)).toBe(true);
    expect(tree.delete(12)).toBe(true);
    expect(tree.delete(10)).toBe(true);
    expect(tree.delete(10)).toBe(false);
    expect(tree.inOrderTraversal()).toEqual([5, 7, 11, 15, 18]);
    expect(tree.size).toBe(5);
  });

  it("orders custom objects using a comparator", () => {
    const tree = new BinarySearchTree<{ key: number; label: string }>((a, b) => a.key - b.key);
    tree.insert({ key: 2, label: "b" });
    tree.insert({ key: 1, label: "a" });
    expect(tree.inOrderTraversal().map((item) => item.label)).toEqual(["a", "b"]);
    expect(tree.insert({ key: 2, label: "duplicate" })).toBe(false);
  });

  it("treats NaN values as comparator-equal with the default comparator", () => {
    const tree = new BinarySearchTree<number>();
    expect(tree.insert(Number.NaN)).toBe(true);
    expect(tree.insert(Number.NaN)).toBe(false);
    expect(tree.contains(Number.NaN)).toBe(true);
  });
});

describe("heaps", () => {
  it("maintains min-heap order and handles empty and clear", () => {
    const heap = new MinHeap<number>();
    expect(heap.extractMin()).toBeUndefined();
    expect(heap.peek()).toBeUndefined();
    for (const value of [5, 2, 8, 1]) heap.insert(value);
    expect(heap.peek()).toBe(1);
    expect([heap.extractMin(), heap.extractMin(), heap.extractMin(), heap.extractMin()]).toEqual([
      1, 2, 5, 8,
    ]);
    expect(heap.isEmpty()).toBe(true);
    heap.insert(3);
    heap.clear();
    expect(heap.size).toBe(0);
  });

  it("maintains max-heap order and accepts a custom comparator", () => {
    const heap = new MaxHeap<{ rank: number }>((a, b) => a.rank - b.rank);
    heap.insert({ rank: 2 });
    heap.insert({ rank: 7 });
    heap.insert({ rank: 4 });
    expect(heap.extractMax()?.rank).toBe(7);
    expect(heap.peek()?.rank).toBe(4);
    expect(heap.extractMax()?.rank).toBe(4);
    expect(heap.extractMax()?.rank).toBe(2);
  });
});

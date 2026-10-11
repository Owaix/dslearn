import { describe, expect, it } from "vitest";
import { DisjointSet, HashTable, PriorityQueue } from "../src/index.js";

describe("HashTable", () => {
  it("handles collisions, updates, resizing, iteration, and missing keys", () => {
    const table = new HashTable<string, number>(2, () => 1);
    expect(table.get("missing")).toBeUndefined();
    expect(table.has("missing")).toBe(false);
    expect(table.delete("missing")).toBe(false);
    table.set("a", 1).set("b", 2).set("a", 3).set("c", 4);
    expect(table.size).toBe(3);
    expect(table.get("a")).toBe(3);
    expect(table.has("b")).toBe(true);
    expect([...table.keys()].sort()).toEqual(["a", "b", "c"]);
    expect([...table.values()].sort()).toEqual([2, 3, 4]);
    expect([...table.entries()].length).toBe(3);
    expect([...table].length).toBe(3);
    expect(table.delete("b")).toBe(true);
    expect(table.delete("b")).toBe(false);
    table.clear();
    expect(table.size).toBe(0);
    expect([...table]).toEqual([]);
    expect(() => new HashTable(0)).toThrow(RangeError);
  });

  it("supports primitive keys, SameValueZero, symbols, and object identity", () => {
    const table = new HashTable<unknown, string>();
    const object = { id: 1 };
    const symbol = Symbol("key");
    table.set(1, "number").set("1", "string").set(NaN, "nan").set(-0, "zero");
    table.set(object, "object").set(symbol, "symbol").set(undefined, "undefined");
    expect(table.get(1)).toBe("number");
    expect(table.get("1")).toBe("string");
    expect(table.get(Number.NaN)).toBe("nan");
    expect(table.get(0)).toBe("zero");
    expect(table.get(object)).toBe("object");
    expect(table.get({ id: 1 })).toBeUndefined();
    expect(table.get(symbol)).toBe("symbol");
    expect(table.has(undefined)).toBe(true);
  });
});

describe("PriorityQueue", () => {
  it("dequeues in comparator order, preserving equal-priority insertion order", () => {
    const queue = new PriorityQueue<{ priority: number; label: string }>(
      (a, b) => a.priority - b.priority,
    );
    expect(queue.dequeue()).toBeUndefined();
    expect(queue.peek()).toBeUndefined();
    queue.enqueue({ priority: 2, label: "later" });
    queue.enqueue({ priority: 1, label: "first" });
    queue.enqueue({ priority: 1, label: "second" });
    expect(queue.peek()?.label).toBe("first");
    expect(queue.dequeue()?.label).toBe("first");
    expect(queue.dequeue()?.label).toBe("second");
    expect(queue.dequeue()?.label).toBe("later");
    expect(queue.isEmpty()).toBe(true);
    queue.enqueue(4);
    queue.clear();
    expect(queue.size).toBe(0);
  });
});

describe("DisjointSet", () => {
  it("adds elements, unions components, compresses paths, and clears", () => {
    const set = new DisjointSet<number>();
    expect(set.find(8)).toBeUndefined();
    expect(set.union(1, 2)).toBe(false);
    expect(set.add(1)).toBe(true);
    expect(set.add(1)).toBe(false);
    set.add(2);
    set.add(3);
    expect(set.union(1, 2)).toBe(true);
    expect(set.union(2, 1)).toBe(false);
    expect(set.connected(1, 2)).toBe(true);
    expect(set.connected(1, 3)).toBe(false);
    expect(set.union(1, 3)).toBe(true);
    expect(set.find(3)).toBe(set.find(1));
    expect(set.size).toBe(3);
    set.clear();
    expect(set.size).toBe(0);
  });

  it("allows undefined as a value when membership exists", () => {
    const set = new DisjointSet<string | undefined>();
    set.add(undefined);
    set.add("defined");
    expect(set.has(undefined)).toBe(true);
    expect(set.has("missing")).toBe(false);
    expect(set.union(undefined, "defined")).toBe(true);
    expect(set.connected(undefined, "defined")).toBe(true);
  });

  it("uses SameValueZero equality for NaN members", () => {
    const set = new DisjointSet<number>();
    expect(set.add(Number.NaN)).toBe(true);
    expect(set.find(Number.NaN)).toBeNaN();
    expect(set.union(Number.NaN, Number.NaN)).toBe(false);
    expect(set.connected(Number.NaN, Number.NaN)).toBe(true);
  });
});

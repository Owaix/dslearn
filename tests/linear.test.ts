import { describe, expect, it } from "vitest";
import { Deque, DoublyLinkedList, LinkedList, Queue, Stack } from "../src/index.js";

describe("LinkedList", () => {
  it("supports insertion, lookup, removal, iteration, and clear", () => {
    const list = new LinkedList<number>();
    expect([...list]).toEqual([]);
    expect(list.get(0)).toBeUndefined();
    expect(list.removeAt(0)).toBeUndefined();
    expect(list.remove(4)).toBe(false);
    expect(list.insertAt(1, 0)).toBe(false);
    list.append(2);
    list.prepend(1);
    expect(list.insertAt(1, 3)).toBe(true);
    expect(list.toArray()).toEqual([1, 3, 2]);
    expect(list.find((value) => value > 1)).toBe(3);
    expect(list.contains(2)).toBe(true);
    expect(list.contains(5)).toBe(false);
    expect(list.get(1)).toBe(3);
    expect(list.get(-1)).toBeUndefined();
    expect(list.get(1.5)).toBeUndefined();
    expect(list.remove(3)).toBe(true);
    expect(list.removeAt(1)).toBe(2);
    expect(list.removeAt(0)).toBe(1);
    expect(list.size).toBe(0);
    list.append(undefined);
    expect(list.contains(undefined)).toBe(true);
    list.clear();
    expect(list.toArray()).toEqual([]);
  });

  it("supports custom objects by reference and duplicate removal of the first match", () => {
    const object = { id: 1 };
    const list = new LinkedList<object>();
    list.append(object);
    list.append(object);
    expect(list.remove(object)).toBe(true);
    expect(list.size).toBe(1);
  });
});

describe("DoublyLinkedList", () => {
  it("supports bidirectional endpoint changes and indexed operations", () => {
    const list = new DoublyLinkedList<string>();
    expect([...list]).toEqual([]);
    expect(list.insertAt(-1, "x")).toBe(false);
    list.append("b");
    list.prepend("a");
    list.append("d");
    list.insertAt(2, "c");
    expect(list.toArray()).toEqual(["a", "b", "c", "d"]);
    expect(list.get(3)).toBe("d");
    expect(list.find((value) => value === "b")).toBe("b");
    expect(list.remove("a")).toBe(true);
    expect(list.remove("missing")).toBe(false);
    expect(list.removeAt(2)).toBe("d");
    expect(list.removeAt(0)).toBe("b");
    expect(list.removeAt(0)).toBe("c");
    expect(list.size).toBe(0);
    list.prepend("again");
    list.clear();
    expect(list.toArray()).toEqual([]);
    expect(list.removeAt(0)).toBeUndefined();
  });
});

describe("Stack", () => {
  it("uses LIFO order and supports empty, clear, and iteration", () => {
    const stack = new Stack<number>();
    expect(stack.pop()).toBeUndefined();
    expect(stack.peek()).toBeUndefined();
    expect(stack.isEmpty()).toBe(true);
    stack.push(1);
    stack.push(2);
    expect([...stack]).toEqual([2, 1]);
    expect(stack.peek()).toBe(2);
    expect(stack.pop()).toBe(2);
    expect(stack.size).toBe(1);
    stack.clear();
    expect(stack.isEmpty()).toBe(true);
  });
});

describe("Queue", () => {
  it("uses FIFO order through wraparound and buffer growth", () => {
    const queue = new Queue<number>();
    expect(queue.dequeue()).toBeUndefined();
    expect(queue.peek()).toBeUndefined();
    expect(queue.isEmpty()).toBe(true);
    for (let value = 0; value < 8; value++) queue.enqueue(value);
    expect(queue.dequeue()).toBe(0);
    expect(queue.dequeue()).toBe(1);
    queue.enqueue(8);
    queue.enqueue(9);
    queue.enqueue(10);
    expect([...queue]).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(queue.peek()).toBe(2);
    expect(queue.size).toBe(9);
    queue.clear();
    expect(queue.dequeue()).toBeUndefined();
    const nullable = new Queue<null | undefined>();
    nullable.enqueue(null);
    nullable.enqueue(undefined);
    expect(nullable.dequeue()).toBeNull();
    expect(nullable.dequeue()).toBeUndefined();
  });
});

describe("Deque", () => {
  it("supports both ends and circular growth", () => {
    const deque = new Deque<number>();
    expect(deque.popFront()).toBeUndefined();
    expect(deque.popBack()).toBeUndefined();
    deque.pushBack(2);
    deque.pushFront(1);
    deque.pushBack(3);
    expect(deque.peekFront()).toBe(1);
    expect(deque.peekBack()).toBe(3);
    expect([...deque]).toEqual([1, 2, 3]);
    expect(deque.popBack()).toBe(3);
    expect(deque.popFront()).toBe(1);
    deque.clear();
    for (let value = 0; value < 12; value++) deque.pushBack(value);
    expect(deque.size).toBe(12);
    expect(deque.popFront()).toBe(0);
    deque.clear();
    expect(deque.isEmpty()).toBe(true);
  });
});

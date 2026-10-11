import {
  BinarySearchTree,
  Deque,
  DisjointSet,
  DoublyLinkedList,
  Graph,
  HashTable,
  LinkedList,
  MaxHeap,
  MinHeap,
  PriorityQueue,
  Queue,
  Stack,
  Trie,
} from "../dist/index.js";

const list = new LinkedList();
list.append("second");
list.prepend("first");
console.log("LinkedList", list.toArray());

const doublyLinkedList = new DoublyLinkedList();
doublyLinkedList.append(1);
doublyLinkedList.append(2);
console.log("DoublyLinkedList", [...doublyLinkedList]);

const stack = new Stack();
stack.push("bottom");
stack.push("top");
console.log("Stack pop", stack.pop());

const queue = new Queue();
queue.enqueue("first");
queue.enqueue("second");
console.log("Queue dequeue", queue.dequeue());

const deque = new Deque();
deque.pushFront(2);
deque.pushFront(1);
deque.pushBack(3);
console.log("Deque", [...deque]);

const table = new HashTable();
table.set("language", "TypeScript");
console.log("HashTable", table.get("language"));

const priorityQueue = new PriorityQueue((left, right) => left.priority - right.priority);
priorityQueue.enqueue({ priority: 2, task: "later" });
priorityQueue.enqueue({ priority: 1, task: "sooner" });
console.log("PriorityQueue", priorityQueue.dequeue());

const sets = new DisjointSet();
sets.add("north");
sets.add("south");
sets.union("north", "south");
console.log("DisjointSet connected", sets.connected("north", "south"));

const tree = new BinarySearchTree((left, right) => left - right);
[5, 3, 7].forEach((value) => tree.insert(value));
console.log("BinarySearchTree", tree.inOrderTraversal());

const minHeap = new MinHeap();
[5, 1, 3].forEach((value) => minHeap.insert(value));
console.log("MinHeap minimum", minHeap.extractMin());

const maxHeap = new MaxHeap();
[5, 1, 3].forEach((value) => maxHeap.insert(value));
console.log("MaxHeap maximum", maxHeap.extractMax());

const trie = new Trie();
trie.insert("structure");
trie.insert("strong");
console.log("Trie prefix", trie.wordsWithPrefix("str"));

const graph = new Graph();
graph.addEdge("A", "B");
graph.addEdge("B", "C");
console.log("Graph BFS", graph.bfs("A"));

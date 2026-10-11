# dslearn

`dslearn` is a dependency-free-at-runtime collection of generic, reusable data structures for JavaScript and TypeScript. The package ships native ESM JavaScript and TypeScript declarations. Maintained by `imowaix`.

## Installation

```sh
npm install dslearn
```

The published library requires Node.js 18 or newer. The development test runner (Vitest 4) requires Node.js 20 or newer.

## Quick Start

```ts
import { LinkedList, Graph, MinHeap } from "dslearn";

const names = new LinkedList<string>();
names.append("Ada");
names.prepend("Grace");
console.log(names.toArray()); // ["Grace", "Ada"]

const jobs = new MinHeap<number>();
jobs.insert(8);
jobs.insert(3);
console.log(jobs.extractMin()); // 3

const graph = new Graph<string>();
graph.addEdge("home", "work");
console.log(graph.hasPath("home", "work")); // true
```

The complete runnable example is in [`examples/all-structures.mjs`](examples/all-structures.mjs); after building, run it with `node examples/all-structures.mjs`.

## Data Structures

### Linear

```ts
import { LinkedList, DoublyLinkedList, Stack, Queue, Deque } from "dslearn";

const list = new LinkedList<number>();
list.append(10);
list.insertAt(0, 5);
list.removeAt(1); // 10

const doubly = new DoublyLinkedList<string>();
doubly.append("first");
doubly.prepend("new first");

const stack = new Stack<string>();
stack.push("bottom");
stack.push("top");
stack.pop(); // "top"

const queue = new Queue<number>();
queue.enqueue(1);
queue.dequeue(); // 1

const deque = new Deque<number>();
deque.pushFront(2);
deque.pushBack(3);
deque.popFront(); // 2
```

`LinkedList<T>` and `DoublyLinkedList<T>` provide `append`, `prepend`, `insertAt`, `remove`, `removeAt`, `find`, `contains`, `get`, `clear`, `toArray`, `size`, and iteration. Insertions return `true` on success and `false` for an invalid index. `remove` returns whether a match was removed; `removeAt` and `get` return `undefined` for invalid indexes. `find(predicate)` returns the first matching value or `undefined` when no item matches. Equality for `remove` and `contains` is `Object.is`, and `remove` removes only the first match. Iteration follows head-to-tail order.

`Stack<T>` provides `push`, `pop`, `peek`, `isEmpty`, `clear`, `size`, and iteration (top to bottom). `Queue<T>` provides `enqueue`, `dequeue`, `peek`, `isEmpty`, `clear`, `size`, and iteration (front to back). Empty `pop`, `peek`, and `dequeue` operations return `undefined`. Queue storage is a growable circular buffer.

`Deque<T>` provides `pushFront`, `pushBack`, `popFront`, `popBack`, `peekFront`, `peekBack`, `isEmpty`, `clear`, `size`, and front-to-back iteration. Empty pops and peeks return `undefined`. Its circular buffer grows geometrically.

### Hash-Based

```ts
import { HashTable, PriorityQueue, DisjointSet } from "dslearn";

const scores = new HashTable<string, number>();
scores.set("Ada", 98);
scores.get("Ada"); // 98

type Job = { priority: number; name: string };
const jobs = new PriorityQueue<Job>((a, b) => a.priority - b.priority);
jobs.enqueue({ priority: 1, name: "urgent" });
jobs.dequeue()?.name; // "urgent"

const groups = new DisjointSet<string>();
groups.add("A");
groups.add("B");
groups.union("A", "B");
groups.connected("A", "B"); // true
```

`HashTable<K, V>` provides `set`, `get`, `has`, `delete`, `clear`, `keys`, `values`, `entries`, `size`, and `[Symbol.iterator]` (entries). `set` updates an existing key and returns the table. `get` returns `undefined` for a missing key; use `has` to distinguish a stored `undefined` value. `delete` reports whether a key existed. Its constructor is `new HashTable<K, V>(initialCapacity = 16, hashFunction?)`; capacity must be a positive integer. It uses separate-chaining buckets, resizes above a 0.75 load factor, and defaults to SameValueZero key equality. Primitive keys are supported. Object and function keys use reference identity, not structural equality. Symbols use symbol identity. A custom hash function must return a stable finite number for each key; equal keys must produce equal hashes. Collisions are resolved within buckets.

`PriorityQueue<T>` provides `enqueue`, `dequeue`, `peek`, `isEmpty`, `clear`, `size`, and iteration (heap-array order, not sorted order). The constructor accepts a comparator where a negative result means the left item has higher priority; ties are dequeued in insertion order. Empty `dequeue` and `peek` return `undefined`. The default comparator uses JavaScript `<`; provide a comparator for objects or domain-specific ordering.

`DisjointSet<T>` provides `add`, `has`, `find`, `union`, `connected`, `clear`, and `size`. `add` reports whether a new value was added. `find` returns a representative or `undefined` if absent; `has` disambiguates an absent value from an inserted `undefined`. `union` returns `true` only when it joins two existing components; it returns `false` when either value is missing or they are already connected. `connected` is false if either item is absent. Values use JavaScript `Map` key equality (SameValueZero).

### Trees and Trie

```ts
import { BinarySearchTree, MinHeap, MaxHeap, Trie } from "dslearn";

const byAge = new BinarySearchTree<{ name: string; age: number }>((a, b) => a.age - b.age);
byAge.insert({ name: "Ada", age: 36 });
byAge.inOrderTraversal();

const min = new MinHeap<number>();
const max = new MaxHeap<number>();
min.insert(4);
max.insert(4);

const words = new Trie();
words.insert("structure");
words.startsWith("str"); // true
words.wordsWithPrefix("str"); // ["structure"]
```

`BinarySearchTree<T>` provides `insert`, `search`, `contains`, `delete`, `inOrderTraversal`, `preOrderTraversal`, `postOrderTraversal`, `levelOrderTraversal`, `clear`, and `size`. Its comparator defaults to JavaScript `<`. Comparator-equal duplicates are ignored (`insert` returns `false`); successful insertions and deletions return `true`. `search` returns the stored value or `undefined`, while `contains` avoids that ambiguity. Traversals return new arrays. A plain BST can become unbalanced; recursive insertion, deletion, and depth-first traversals may reach call-stack limits for extremely skewed trees.

`MinHeap<T>` provides `insert`, `peek`, `extractMin`, `isEmpty`, `clear`, and `size`. `MaxHeap<T>` offers the same API with `extractMax`. Both accept a comparator and return `undefined` from an empty peek or extraction.

`Trie` stores case-sensitive strings and provides `insert`, `search`, `contains`, `startsWith`, `wordsWithPrefix`, `delete`, `clear`, and `size`. Insert and delete return whether the set of stored words changed. The empty string is a valid word and prefix. `startsWith("")` is always true, including for an empty trie. Prefix results are returned in child insertion order.

### Graph

```ts
import { Graph } from "dslearn";

const graph = new Graph<string>(); // undirected by default
graph.addEdge("A", "B", 2);
graph.addEdge("B", "C");
graph.bfs("A"); // ["A", "B", "C"]
graph.hasPath("A", "C"); // true

const directed = new Graph<string>(true);
directed.addEdge("source", "target");
```

`Graph<T>` uses adjacency lists and provides `addVertex`, `addEdge`, `removeVertex`, `removeEdge`, `getNeighbors`, `bfs`, `dfs`, `hasPath`, and `size`. `addVertex` and removal methods return booleans. `addEdge` creates missing vertices and returns `void`; its optional weight defaults to `1` and must be finite. Re-adding an edge updates its weight. Undirected edges are stored in both directions; self-loops are allowed. The constructor's `directed` option defaults to `false`. `getNeighbors` returns a new array of `{ vertex, weight }` records and returns `[]` for a missing vertex. BFS and DFS return visit-order arrays and return `[]` for a missing start; both visit only the start's reachable component. `hasPath` is false if either vertex is missing, and true for a vertex's path to itself if it exists.

## API Return and Edge-Case Behavior

- Methods that remove or search by value generally return `boolean` when absence must be distinguishable; value-returning `get`/`peek`/`pop`/`dequeue` methods use `undefined` for absence. If `undefined` itself is a valid stored value, use a membership method (`has`, `contains`, or `size`) when available to distinguish it.
- List indexes must be integers. `insertAt` permits indexes from `0` through `size`; retrieval/removal require indexes from `0` through `size - 1`. Invalid indexes do not mutate the list.
- List and graph values can include `null` or `undefined`; JavaScript equality rules apply as described per structure. Custom-object list matching uses identity via `Object.is`.
- Hash-table object keys compare by reference. To use structural object keys, supply a stable custom hash strategy and use primitive canonical keys, or wrap the object in an identity-aware key chosen by the application. A custom hash function still relies on SameValueZero equality.
- Ordered structures require a consistent comparator (negative, zero, positive). The default comparator is suitable for consistently ordered primitive values; use custom comparators for records and mixed/domain-specific ordering.
- Duplicate list items are allowed; list `remove` removes the first. Hash-table duplicate keys replace values. BST and Trie duplicate insertion is ignored. Graph duplicate edges update weights. Priority-queue ties remain stable.

## Complexity

| Structure / operation                                  | Expected time                | Extra space                    |
| ------------------------------------------------------ | ---------------------------- | ------------------------------ |
| Linked-list append/prepend                             | O(1)                         | O(1) per node                  |
| Linked-list indexed access/insert/remove/search        | O(n)                         | O(1) excluding returned arrays |
| Doubly-linked-list append/prepend                      | O(1)                         | O(1) per node                  |
| Doubly-linked-list indexed access/insert/remove/search | O(n)                         | O(1) excluding returned arrays |
| Stack push/pop/peek                                    | O(1)                         | O(1) per node                  |
| Queue enqueue/dequeue/peek                             | Amortized O(1); resize O(n)  | O(n)                           |
| Deque endpoint operations                              | Amortized O(1); resize O(n)  | O(n)                           |
| Hash-table get/set/delete                              | Expected O(1), worst O(n)    | O(capacity + entries)          |
| Hash-table iteration                                   | O(capacity + entries)        | O(1) excluding yielded entries |
| Priority-queue enqueue/dequeue                         | O(log n)                     | O(n)                           |
| Priority-queue peek                                    | O(1)                         | O(1)                           |
| Disjoint-set find/union                                | Amortized O(α(n))            | O(n)                           |
| BST operations                                         | Average O(log n), worst O(n) | O(n)                           |
| Heap insert/extract                                    | O(log n)                     | O(n)                           |
| Heap peek                                              | O(1)                         | O(1)                           |
| Trie operation on a string of length L                 | O(L), excluding output       | O(total characters)            |
| Trie wordsWithPrefix                                   | O(P + returned text)         | O(returned text)               |
| Graph add-edge/get-neighbors                           | Expected O(1) / O(degree)    | O(V + E)                       |
| Graph BFS/DFS/hasPath                                  | O(V + E)                     | O(V)                           |
| Graph remove-vertex                                    | O(V + degree)                | O(1)                           |

Here `n` is the number of stored items, `V` vertices, `E` stored adjacency entries, `L` string length, `P` prefix length, and `α` the inverse Ackermann function. Hash-table bounds assume a well-distributed hash; adversarial collisions degrade operations to linear time. Graph `E` counts both stored directions for undirected edges.

## Development

```sh
npm install
npm test
npm run build
npm run lint
npm run format:check
npm run benchmark
```

Benchmarks are informational microbenchmarks, not performance guarantees. They compare operations with compatible built-in operations and depend on the runtime and machine.

## Contributing

Keep changes focused, add tests for public behavior and edge cases, and run `npm run validate` before opening a pull request. Public API or behavior changes should be documented in this README and the changelog.

See [the npm publishing guide](docs/npm-publishing.md) for release steps and [the Git guide](docs/git-workflow.md) for repository workflow and command explanations.

## License

MIT. See [`LICENSE`](LICENSE).

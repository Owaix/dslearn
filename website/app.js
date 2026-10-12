import * as ds from "./dist/index.js";

window.addEventListener("DOMContentLoaded", () => window.lucide?.createIcons());
const diagrams = [...document.querySelectorAll("code.language-mermaid")];
if (diagrams.length) {
  import("https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs")
    .then(async ({ default: mermaid }) => {
      mermaid.initialize({ startOnLoad: false, theme: "neutral", securityLevel: "strict" });
      for (const [index, diagram] of diagrams.entries()) {
        const { svg } = await mermaid.render(`lesson-flow-${index}`, diagram.textContent);
        const figure = document.createElement("div");
        figure.className = "diagram";
        figure.innerHTML = svg;
        diagram.parentElement.replaceWith(figure);
      }
    })
    .catch(() => {});
}

const pages = [...document.querySelectorAll(".document")];
const links = [...document.querySelectorAll("#navigation a")];
const slug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
    .replace(/ +/g, "-");
for (const page of pages) {
  for (const heading of page.querySelectorAll("h2, h3"))
    heading.id = `${page.id}-${slug(heading.textContent)}`;
  for (const link of page.querySelectorAll("a")) {
    const href = link.getAttribute("href");
    if (!href || /^(https?:|#)/.test(href)) continue;
    const targets = {
      "README.md": "reference",
      "learning-path.md": "learning",
      "git-workflow.md": "git",
      "npm-publishing.md": "publishing",
      "CONTRIBUTING.md": "contributing",
      LICENSE: "license",
    };
    const file = href.split("#")[0].split("/").pop();
    if (targets[file]) {
      const anchor = href.split("#")[1];
      link.href = `#${targets[file]}${anchor ? `-${anchor}` : ""}`;
    } else
      link.href = `https://github.com/Owaix/dslearn/blob/master/${href.replace(/^(\.\.\/|\.\/)+/, "")}`;
  }
}
function route() {
  const hash = location.hash.slice(1) || "start";
  const page =
    pages.find((candidate) => candidate.id === hash) ??
    pages.find((candidate) => hash.startsWith(`${candidate.id}-`)) ??
    pages[0];
  pages.forEach((candidate) => {
    candidate.hidden = candidate !== page;
  });
  links.forEach((link) => {
    link.classList.toggle("active", link.hash === `#${page.id}`);
  });
  document.title = `${page.querySelector("h1")?.textContent ?? "Documentation"} | dslearn`;
  const toc = document.querySelector("#toc");
  toc.replaceChildren();
  const title = document.createElement("strong");
  title.textContent = "ON THIS PAGE";
  toc.append(title);
  for (const heading of page.querySelectorAll("h2")) {
    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    toc.append(link);
  }
  document.querySelector("#sidebar").classList.remove("open");
  document.querySelector("#menu").setAttribute("aria-expanded", "false");
  if (hash !== page.id && hash !== "start") document.getElementById(hash)?.scrollIntoView();
  else window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);
route();
document.querySelector("#menu").addEventListener("click", () => {
  const open = document.querySelector("#sidebar").classList.toggle("open");
  document.querySelector("#menu").setAttribute("aria-expanded", String(open));
});
document.querySelector("#search").addEventListener("input", (event) => {
  const term = event.target.value.toLowerCase().trim();
  links.forEach((link) => {
    const page = pages.find((candidate) => `#${candidate.id}` === link.hash);
    link.hidden = !`${link.textContent} ${page?.textContent}`.toLowerCase().includes(term);
  });
  document.querySelector("#search-empty").hidden = links.some((link) => !link.hidden);
});
document.querySelector("#copy-install").addEventListener("click", async () => {
  const status = document.querySelector("#copy-status");
  try {
    await navigator.clipboard.writeText("npm install dslearn");
    status.textContent = "Copied.";
  } catch {
    status.textContent = "Copy unavailable. Command: npm install dslearn";
  }
});
const examples = {
  LinkedList: [
    "const list = new LinkedList();\nlist.append('second');\nlist.prepend('first');\nlist.toArray();",
    () => {
      const list = new ds.LinkedList();
      list.append("second");
      list.prepend("first");
      return list.toArray();
    },
  ],
  DoublyLinkedList: [
    "const list = new DoublyLinkedList();\nlist.append(1);\nlist.append(3);\nlist.insertAt(1, 2);\nlist.toArray();",
    () => {
      const list = new ds.DoublyLinkedList();
      list.append(1);
      list.append(3);
      list.insertAt(1, 2);
      return list.toArray();
    },
  ],
  Stack: [
    "const stack = new Stack();\nstack.push('first');\nstack.push('last');\nstack.pop();",
    () => {
      const stack = new ds.Stack();
      stack.push("first");
      stack.push("last");
      return stack.pop();
    },
  ],
  Queue: [
    "const queue = new Queue();\nqueue.enqueue('first');\nqueue.enqueue('last');\nqueue.dequeue();",
    () => {
      const queue = new ds.Queue();
      queue.enqueue("first");
      queue.enqueue("last");
      return queue.dequeue();
    },
  ],
  Deque: [
    "const deque = new Deque();\ndeque.pushBack(2);\ndeque.pushFront(1);\n[...deque];",
    () => {
      const deque = new ds.Deque();
      deque.pushBack(2);
      deque.pushFront(1);
      return [...deque];
    },
  ],
  HashTable: [
    "const table = new HashTable();\ntable.set('language', 'TypeScript');\ntable.get('language');",
    () => {
      const table = new ds.HashTable();
      table.set("language", "TypeScript");
      return table.get("language");
    },
  ],
  PriorityQueue: [
    "const jobs = new PriorityQueue((a, b) => a.rank - b.rank);\njobs.enqueue({ rank: 2 });\njobs.enqueue({ rank: 1 });\njobs.dequeue();",
    () => {
      const jobs = new ds.PriorityQueue((left, right) => left.rank - right.rank);
      jobs.enqueue({ rank: 2 });
      jobs.enqueue({ rank: 1 });
      return jobs.dequeue();
    },
  ],
  DisjointSet: [
    "const groups = new DisjointSet();\ngroups.add('A');\ngroups.add('B');\ngroups.union('A', 'B');\ngroups.connected('A', 'B');",
    () => {
      const groups = new ds.DisjointSet();
      groups.add("A");
      groups.add("B");
      groups.union("A", "B");
      return groups.connected("A", "B");
    },
  ],
  BinarySearchTree: [
    "const tree = new BinarySearchTree();\n[5, 3, 7].forEach(value => tree.insert(value));\ntree.inOrderTraversal();",
    () => {
      const tree = new ds.BinarySearchTree();
      [5, 3, 7].forEach((value) => tree.insert(value));
      return tree.inOrderTraversal();
    },
  ],
  MinHeap: [
    "const heap = new MinHeap();\n[5, 1, 3].forEach(value => heap.insert(value));\nheap.extractMin();",
    () => {
      const heap = new ds.MinHeap();
      [5, 1, 3].forEach((value) => heap.insert(value));
      return heap.extractMin();
    },
  ],
  MaxHeap: [
    "const heap = new MaxHeap();\n[5, 1, 3].forEach(value => heap.insert(value));\nheap.extractMax();",
    () => {
      const heap = new ds.MaxHeap();
      [5, 1, 3].forEach((value) => heap.insert(value));
      return heap.extractMax();
    },
  ],
  Trie: [
    "const words = new Trie();\nwords.insert('structure');\nwords.insert('strong');\nwords.wordsWithPrefix('str');",
    () => {
      const words = new ds.Trie();
      words.insert("structure");
      words.insert("strong");
      return words.wordsWithPrefix("str");
    },
  ],
  Graph: [
    "const graph = new Graph();\ngraph.addEdge('A', 'B');\ngraph.addEdge('B', 'C');\ngraph.bfs('A');",
    () => {
      const graph = new ds.Graph();
      graph.addEdge("A", "B");
      graph.addEdge("B", "C");
      return graph.bfs("A");
    },
  ],
};
const select = document.querySelector("#structure");
for (const name of Object.keys(examples)) {
  const option = document.createElement("option");
  option.value = name;
  option.textContent = name;
  select.append(option);
}
function showExample() {
  document.querySelector("#example-code").textContent =
    `import { ${select.value} } from 'dslearn';\n\n${examples[select.value][0]}`;
  document.querySelector("#output").textContent = "Ready.";
}
select.addEventListener("change", showExample);
showExample();
document.querySelector("#run-example").addEventListener("click", () => {
  try {
    document.querySelector("#output").textContent = JSON.stringify(
      examples[select.value][1](),
      null,
      2,
    );
  } catch (error) {
    document.querySelector("#output").textContent = error.message;
  }
});

import { describe, expect, it } from "vitest";
import { Graph, Trie } from "../src/index.js";

describe("Trie", () => {
  it("matches words and prefixes, including empty strings, and deletes safely", () => {
    const trie = new Trie();
    expect(trie.search("no")).toBe(false);
    expect(trie.startsWith("")).toBe(true);
    expect(trie.insert("")).toBe(true);
    expect(trie.insert("car")).toBe(true);
    expect(trie.insert("cart")).toBe(true);
    expect(trie.insert("cat")).toBe(true);
    expect(trie.insert("car")).toBe(false);
    expect(trie.size).toBe(4);
    expect(trie.contains("car")).toBe(true);
    expect(trie.search("ca")).toBe(false);
    expect(trie.startsWith("ca")).toBe(true);
    expect(trie.wordsWithPrefix("car")).toEqual(["car", "cart"]);
    expect(trie.wordsWithPrefix("missing")).toEqual([]);
    expect(trie.delete("missing")).toBe(false);
    expect(trie.delete("car")).toBe(true);
    expect(trie.search("cart")).toBe(true);
    expect(trie.delete("")).toBe(true);
    trie.clear();
    expect(trie.size).toBe(0);
    expect(trie.startsWith("anything")).toBe(false);
  });
});

describe("Graph", () => {
  it("traverses undirected weighted graphs and removes edges and vertices", () => {
    const graph = new Graph<string>();
    expect(graph.getNeighbors("missing")).toEqual([]);
    expect(graph.addVertex("a")).toBe(true);
    expect(graph.addVertex("a")).toBe(false);
    graph.addEdge("a", "b", 2);
    graph.addEdge("a", "c");
    graph.addEdge("b", "d");
    graph.addEdge("a", "a");
    graph.addVertex("isolated");
    graph.addEdge("a", "b", 5);
    expect(graph.size).toBe(5);
    expect(graph.getNeighbors("a")).toEqual([
      { vertex: "b", weight: 5 },
      { vertex: "c", weight: 1 },
      { vertex: "a", weight: 1 },
    ]);
    expect(graph.bfs("a")).toEqual(["a", "b", "c", "d"]);
    expect(graph.dfs("a")).toEqual(["a", "b", "d", "c"]);
    expect(graph.bfs("missing")).toEqual([]);
    expect(graph.hasPath("a", "d")).toBe(true);
    expect(graph.hasPath("a", "isolated")).toBe(false);
    expect(graph.hasPath("missing", "missing")).toBe(false);
    expect(graph.removeEdge("a", "b")).toBe(true);
    expect(graph.hasPath("a", "d")).toBe(false);
    expect(graph.removeEdge("a", "b")).toBe(false);
    expect(graph.removeVertex("isolated")).toBe(true);
    expect(graph.removeVertex("isolated")).toBe(false);
  });

  it("supports directed edges, self paths, null vertices, and weight validation", () => {
    const graph = new Graph<number | null>(true);
    graph.addEdge(null, 1, 0);
    graph.addEdge(1, 2);
    expect(graph.getNeighbors(1)).toEqual([{ vertex: 2, weight: 1 }]);
    expect(graph.hasPath(null, 2)).toBe(true);
    expect(graph.hasPath(2, null)).toBe(false);
    expect(graph.hasPath(null, null)).toBe(true);
    expect(() => graph.addEdge(1, 2, Number.NaN)).toThrow(RangeError);
    expect(graph.removeVertex(1)).toBe(true);
    expect(graph.getNeighbors(null)).toEqual([]);
  });

  it("uses SameValueZero equality for NaN vertices", () => {
    const graph = new Graph<number>();
    graph.addVertex(Number.NaN);
    expect(graph.hasPath(Number.NaN, Number.NaN)).toBe(true);
    expect(graph.bfs(Number.NaN)).toHaveLength(1);
  });
});

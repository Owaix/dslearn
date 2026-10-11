export type Neighbor<T> = { vertex: T; weight: number };

export class Graph<T> {
  private adjacency = new Map<T, Map<T, number>>();

  constructor(readonly directed = false) {}

  get size(): number {
    return this.adjacency.size;
  }

  addVertex(vertex: T): boolean {
    if (this.adjacency.has(vertex)) return false;
    this.adjacency.set(vertex, new Map());
    return true;
  }

  addEdge(source: T, destination: T, weight = 1): void {
    if (!Number.isFinite(weight)) throw new RangeError("weight must be a finite number");
    this.addVertex(source);
    this.addVertex(destination);
    this.adjacency.get(source)!.set(destination, weight);
    if (!this.directed) this.adjacency.get(destination)!.set(source, weight);
  }

  removeVertex(vertex: T): boolean {
    if (!this.adjacency.delete(vertex)) return false;
    for (const neighbors of this.adjacency.values()) neighbors.delete(vertex);
    return true;
  }

  removeEdge(source: T, destination: T): boolean {
    const removed = this.adjacency.get(source)?.delete(destination) ?? false;
    if (!this.directed) this.adjacency.get(destination)?.delete(source);
    return removed;
  }

  getNeighbors(vertex: T): Neighbor<T>[] {
    const neighbors = this.adjacency.get(vertex);
    if (!neighbors) return [];
    return [...neighbors].map(([neighbor, weight]) => ({ vertex: neighbor, weight }));
  }

  bfs(start: T): T[] {
    if (!this.adjacency.has(start)) return [];
    const visited = new Set<T>([start]);
    const result: T[] = [];
    const queue: T[] = [start];
    for (let index = 0; index < queue.length; index++) {
      const vertex = queue[index]!;
      result.push(vertex);
      for (const neighbor of this.adjacency.get(vertex)!.keys()) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return result;
  }

  dfs(start: T): T[] {
    if (!this.adjacency.has(start)) return [];
    const visited = new Set<T>();
    const result: T[] = [];
    const stack = [start];
    while (stack.length > 0) {
      const vertex = stack.pop()!;
      if (visited.has(vertex)) continue;
      visited.add(vertex);
      result.push(vertex);
      const neighbors = [...this.adjacency.get(vertex)!.keys()];
      for (let index = neighbors.length - 1; index >= 0; index--) {
        if (!visited.has(neighbors[index]!)) stack.push(neighbors[index]!);
      }
    }
    return result;
  }

  hasPath(source: T, destination: T): boolean {
    if (!this.adjacency.has(source) || !this.adjacency.has(destination)) return false;
    if (sameValueZero(source, destination)) return true;
    const visited = new Set<T>([source]);
    const queue: T[] = [source];
    for (let index = 0; index < queue.length; index++) {
      for (const neighbor of this.adjacency.get(queue[index]!)!.keys()) {
        if (sameValueZero(neighbor, destination)) return true;
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return false;
  }
}

function sameValueZero<T>(left: T, right: T): boolean {
  return left === right || (left !== left && right !== right);
}

export class Graph {
    directed;
    adjacency = new Map();
    constructor(directed = false) {
        this.directed = directed;
    }
    get size() {
        return this.adjacency.size;
    }
    addVertex(vertex) {
        if (this.adjacency.has(vertex))
            return false;
        this.adjacency.set(vertex, new Map());
        return true;
    }
    addEdge(source, destination, weight = 1) {
        if (!Number.isFinite(weight))
            throw new RangeError("weight must be a finite number");
        this.addVertex(source);
        this.addVertex(destination);
        this.adjacency.get(source).set(destination, weight);
        if (!this.directed)
            this.adjacency.get(destination).set(source, weight);
    }
    removeVertex(vertex) {
        if (!this.adjacency.delete(vertex))
            return false;
        for (const neighbors of this.adjacency.values())
            neighbors.delete(vertex);
        return true;
    }
    removeEdge(source, destination) {
        const removed = this.adjacency.get(source)?.delete(destination) ?? false;
        if (!this.directed)
            this.adjacency.get(destination)?.delete(source);
        return removed;
    }
    getNeighbors(vertex) {
        const neighbors = this.adjacency.get(vertex);
        if (!neighbors)
            return [];
        return [...neighbors].map(([neighbor, weight]) => ({ vertex: neighbor, weight }));
    }
    bfs(start) {
        if (!this.adjacency.has(start))
            return [];
        const visited = new Set([start]);
        const result = [];
        const queue = [start];
        for (let index = 0; index < queue.length; index++) {
            const vertex = queue[index];
            result.push(vertex);
            for (const neighbor of this.adjacency.get(vertex).keys()) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
        return result;
    }
    dfs(start) {
        if (!this.adjacency.has(start))
            return [];
        const visited = new Set();
        const result = [];
        const stack = [start];
        while (stack.length > 0) {
            const vertex = stack.pop();
            if (visited.has(vertex))
                continue;
            visited.add(vertex);
            result.push(vertex);
            const neighbors = [...this.adjacency.get(vertex).keys()];
            for (let index = neighbors.length - 1; index >= 0; index--) {
                if (!visited.has(neighbors[index]))
                    stack.push(neighbors[index]);
            }
        }
        return result;
    }
    hasPath(source, destination) {
        if (!this.adjacency.has(source) || !this.adjacency.has(destination))
            return false;
        if (sameValueZero(source, destination))
            return true;
        const visited = new Set([source]);
        const queue = [source];
        for (let index = 0; index < queue.length; index++) {
            for (const neighbor of this.adjacency.get(queue[index]).keys()) {
                if (sameValueZero(neighbor, destination))
                    return true;
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
        return false;
    }
}
function sameValueZero(left, right) {
    return left === right || (left !== left && right !== right);
}

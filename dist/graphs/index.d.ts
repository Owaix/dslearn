export type Neighbor<T> = {
    vertex: T;
    weight: number;
};
export declare class Graph<T> {
    readonly directed: boolean;
    private adjacency;
    constructor(directed?: boolean);
    get size(): number;
    addVertex(vertex: T): boolean;
    addEdge(source: T, destination: T, weight?: number): void;
    removeVertex(vertex: T): boolean;
    removeEdge(source: T, destination: T): boolean;
    getNeighbors(vertex: T): Neighbor<T>[];
    bfs(start: T): T[];
    dfs(start: T): T[];
    hasPath(source: T, destination: T): boolean;
}

export declare class Trie {
    private readonly root;
    private count;
    get size(): number;
    insert(word: string): boolean;
    search(word: string): boolean;
    contains(word: string): boolean;
    startsWith(prefix: string): boolean;
    wordsWithPrefix(prefix: string): string[];
    delete(word: string): boolean;
    clear(): void;
    private findNode;
}

type TrieNode = { children: Map<string, TrieNode>; terminal: boolean };

export class Trie {
  private readonly root: TrieNode = { children: new Map(), terminal: false };
  private count = 0;

  get size(): number {
    return this.count;
  }

  insert(word: string): boolean {
    let node = this.root;
    for (const character of word) {
      let child = node.children.get(character);
      if (!child) {
        child = { children: new Map(), terminal: false };
        node.children.set(character, child);
      }
      node = child;
    }
    if (node.terminal) return false;
    node.terminal = true;
    this.count++;
    return true;
  }

  search(word: string): boolean {
    const node = this.findNode(word);
    return node?.terminal ?? false;
  }

  contains(word: string): boolean {
    return this.search(word);
  }

  startsWith(prefix: string): boolean {
    return this.findNode(prefix) !== undefined;
  }

  wordsWithPrefix(prefix: string): string[] {
    const start = this.findNode(prefix);
    if (!start) return [];
    const result: string[] = [];
    const visit = (node: TrieNode, word: string): void => {
      if (node.terminal) result.push(word);
      for (const [character, child] of node.children) visit(child, word + character);
    };
    visit(start, prefix);
    return result;
  }

  delete(word: string): boolean {
    const characters = [...word];
    const remove = (node: TrieNode, index: number): boolean => {
      if (index === characters.length) {
        if (!node.terminal) return false;
        node.terminal = false;
        this.count--;
        return node.children.size === 0;
      }
      const character = characters[index]!;
      const child = node.children.get(character);
      if (!child) return false;
      if (remove(child, index + 1)) node.children.delete(character);
      return !node.terminal && node.children.size === 0;
    };
    if (!this.search(word)) return false;
    remove(this.root, 0);
    return true;
  }

  clear(): void {
    this.root.children.clear();
    this.root.terminal = false;
    this.count = 0;
  }

  private findNode(text: string): TrieNode | undefined {
    let node = this.root;
    for (const character of text) {
      const child = node.children.get(character);
      if (!child) return undefined;
      node = child;
    }
    return node;
  }
}

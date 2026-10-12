export class Trie {
    root = { children: new Map(), terminal: false };
    count = 0;
    get size() {
        return this.count;
    }
    insert(word) {
        let node = this.root;
        for (const character of word) {
            let child = node.children.get(character);
            if (!child) {
                child = { children: new Map(), terminal: false };
                node.children.set(character, child);
            }
            node = child;
        }
        if (node.terminal)
            return false;
        node.terminal = true;
        this.count++;
        return true;
    }
    search(word) {
        const node = this.findNode(word);
        return node?.terminal ?? false;
    }
    contains(word) {
        return this.search(word);
    }
    startsWith(prefix) {
        return this.findNode(prefix) !== undefined;
    }
    wordsWithPrefix(prefix) {
        const start = this.findNode(prefix);
        if (!start)
            return [];
        const result = [];
        const visit = (node, word) => {
            if (node.terminal)
                result.push(word);
            for (const [character, child] of node.children)
                visit(child, word + character);
        };
        visit(start, prefix);
        return result;
    }
    delete(word) {
        const characters = [...word];
        const remove = (node, index) => {
            if (index === characters.length) {
                if (!node.terminal)
                    return false;
                node.terminal = false;
                this.count--;
                return node.children.size === 0;
            }
            const character = characters[index];
            const child = node.children.get(character);
            if (!child)
                return false;
            if (remove(child, index + 1))
                node.children.delete(character);
            return !node.terminal && node.children.size === 0;
        };
        if (!this.search(word))
            return false;
        remove(this.root, 0);
        return true;
    }
    clear() {
        this.root.children.clear();
        this.root.terminal = false;
        this.count = 0;
    }
    findNode(text) {
        let node = this.root;
        for (const character of text) {
            const child = node.children.get(character);
            if (!child)
                return undefined;
            node = child;
        }
        return node;
    }
}

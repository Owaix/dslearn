export class DisjointSet {
    parent = new Map();
    rank = new Map();
    get size() {
        return this.parent.size;
    }
    add(value) {
        if (this.parent.has(value))
            return false;
        this.parent.set(value, value);
        this.rank.set(value, 0);
        return true;
    }
    has(value) {
        return this.parent.has(value);
    }
    find(value) {
        if (!this.parent.has(value))
            return undefined;
        const parent = this.parent.get(value);
        if (!sameValueZero(parent, value))
            this.parent.set(value, this.find(parent));
        return this.parent.get(value);
    }
    union(left, right) {
        if (!this.parent.has(left) || !this.parent.has(right))
            return false;
        let leftRoot = this.find(left);
        let rightRoot = this.find(right);
        if (sameValueZero(leftRoot, rightRoot))
            return false;
        const leftRank = this.rank.get(leftRoot);
        const rightRank = this.rank.get(rightRoot);
        if (leftRank < rightRank)
            [leftRoot, rightRoot] = [rightRoot, leftRoot];
        this.parent.set(rightRoot, leftRoot);
        if (leftRank === rightRank)
            this.rank.set(leftRoot, leftRank + 1);
        return true;
    }
    connected(left, right) {
        if (!this.parent.has(left) || !this.parent.has(right))
            return false;
        return sameValueZero(this.find(left), this.find(right));
    }
    clear() {
        this.parent.clear();
        this.rank.clear();
    }
}
function sameValueZero(left, right) {
    return left === right || (left !== left && right !== right);
}

export function defaultCompare(left, right) {
    if (left === right || (left !== left && right !== right))
        return 0;
    return left < right ? -1 : 1;
}

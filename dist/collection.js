/**
 * @function collectionIterator
 * @param {number[]} set Set in index form.
 * @param {number} layer Layer.
 * @returns {number[][]} Collections.
 */
function collectionIterator(set, layer) {
    let result = [];
    for (let index = 0; index < set.length; index++) {
        let current = set[index];
        let rest = [...set.slice(0, index), ...set.slice(index + 1)];
        if ((layer - 1) > 1) {
            for (let item of collectionIterator(rest, layer - 1)) {
                result.push([current, ...item]);
            }
        }
        else {
            for (let restItem of rest) {
                result.push([current, restItem]);
            }
        }
    }
    return result;
}
/**
 * @function collection
 * @param {unknown[]} set Set.
 * @param {number} select Select.
 * @returns {number[][]} Collections.
 */
function collection(set, select) {
    return collectionIterator(set.map((_value, index) => {
        return index;
    }), select);
}
export { collection };

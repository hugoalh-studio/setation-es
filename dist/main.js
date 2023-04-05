import { isNumber } from "@hugoalh/advanced-determine";
/**
 * @access private
 * @generator setationIndexIterator
 * @param {object} param0
 * @param {number[]} [param0.chain=[]]
 * @param {number} param0.select Select.
 * @param {number[]} param0.set Set in index form.
 * @returns {Generator<number[], void, unknown>} A subset index generator.
 */
function* setationIndexIterator({ chain = [], select, set }) {
    for (let index = 0; index < set.length; index++) {
        let current = set[index];
        let rest = [...set.slice(0, index), ...set.slice(index + 1)];
        if (chain.length + 1 === select) {
            yield [...chain, current];
        }
        else {
            for (let item of setationIndexIterator({
                chain: [...chain, current],
                select,
                set: rest
            })) {
                yield item;
            }
        }
    }
}
/**
 * @access private
 * @generator setation
 * @template {any} T
 * @param {T[] | Set<T>} set Set.
 * @param {number} select Select.
 * @param {boolean} [order=false]
 * @returns {Generator<T[], void, unknown>} A subset generator.
 */
function* setation(set, select, order = false) {
    let setRaw;
    if (Array.isArray(set)) {
        setRaw = set.map((value) => {
            return value;
        });
    }
    else if (set instanceof Set) {
        setRaw = Array.from(set.values());
    }
    else {
        throw new TypeError(`Argument \`set\` must be type of array or set!`);
    }
    if (!isNumber(select, {
        integer: true,
        maximum: setRaw.length,
        positive: true,
        safe: true
    })) {
        throw new TypeError(`Argument \`select\` must be type of number (integer, positive and safe) and <= ${setRaw.length}!`);
    }
    if (typeof order !== "boolean") {
        throw new TypeError(`Argument \`order\` must be type of boolean!`);
    }
    if (setRaw.length === 0 ||
        select === 0) {
        yield [];
        return;
    }
    if (setRaw.length === 1) {
        yield setRaw;
        return;
    }
    let setSub = new Set();
    for (let resultIndex of setationIndexIterator({
        select,
        set: setRaw.map((_value, index) => {
            return index;
        })
    })) {
        let resultIndexResolve = order ? resultIndex : resultIndex.sort((a, b) => {
            return (a - b);
        });
        let resultIndexResolveToken = JSON.stringify(resultIndexResolve);
        if (setSub.has(resultIndexResolveToken)) {
            continue;
        }
        setSub.add(resultIndexResolveToken);
        yield resultIndexResolve.map((value) => {
            return setRaw[value];
        });
    }
}
/**
 * @function combination
 * @description List combinations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {number} select Select.
 * @returns {Generator<T[], void, unknown>} A combinations subset generator.
 */
function combination(set, select) {
    return setation(set, select);
}
/**
 * @function permutation
 * @description List permutations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {number} select Select.
 * @returns {Generator<T[], void, unknown>} A permutations subset generator.
 */
function permutation(set, select) {
    return setation(set, select, true);
}
export { combination, permutation };

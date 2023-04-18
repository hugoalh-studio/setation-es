import { NumberItemFilter } from "@hugoalh/advanced-determine";
const numberIPSFilter = new NumberItemFilter({
    integer: true,
    positive: true,
    safe: true
});
/**
 * @access private
 * @function numbersSorter
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function numbersSorter(a, b) {
    return (a - b);
}
/**
 * @access private
 * @generator setationIndexIterator
 * @param {SetationIndexIteratorParameters} param
 * @returns {Generator<number[], void, unknown>} A subset index generator.
 */
function* setationIndexIterator(param) {
    let { allowRepeat = false, chain = [], set, size } = param;
    for (let setElement of set) {
        let chainCurrent = [...chain, setElement];
        if (chainCurrent.length === size) {
            yield chainCurrent;
        }
        else {
            for (let item of setationIndexIterator({
                ...param,
                chain: chainCurrent,
                set: allowRepeat ? set : set.filter((value) => {
                    return (value !== setElement);
                })
            })) {
                yield item;
            }
        }
    }
}
function* setation(param) {
    let { allowRepeat = false, considerOrder, size, sizeMaximum, sizeMinimum, set } = param;
    let setRaw;
    if (Array.isArray(set)) {
        setRaw = set;
    }
    else if (set instanceof Set) {
        setRaw = Array.from(set.values());
    }
    else {
        throw new TypeError(`Argument \`set\` must be type of array or set!`);
    }
    if (typeof allowRepeat !== "boolean") {
        throw new TypeError(`Argument \`allowRepeat\` must be type of boolean!`);
    }
    if (typeof considerOrder !== "boolean") {
        throw new TypeError(`Argument \`considerOrder\` must be type of boolean!`);
    }
    let sizesRaw = new Set();
    if (typeof size !== "undefined" && (typeof sizeMaximum !== "undefined" ||
        typeof sizeMinimum !== "undefined")) {
        throw new SyntaxError(`Argument \`size\` must not defined with arguments \`sizeMaximum\` and/or \`sizeMinimum\`!`);
    }
    if (typeof size === "undefined" && typeof sizeMaximum === "undefined" && typeof sizeMinimum === "undefined") {
        for (let index = 1; index <= setRaw.length; index++) {
            sizesRaw.add(index);
        }
    }
    else if (typeof size !== "undefined" && typeof sizeMaximum === "undefined" && typeof sizeMinimum === "undefined") {
        if (Array.isArray(size) && size.every((value) => {
            return (numberIPSFilter.test(value) && value <= setRaw.length);
        })) {
            size.forEach((value) => {
                sizesRaw.add(value);
            });
        }
        else if (typeof size === "number" && numberIPSFilter.test(size) && size <= setRaw.length) {
            sizesRaw.add(size);
        }
        else {
            throw new TypeError(`Argument \`size\` must be type of number (integer, positive and safe) and <= ${setRaw.length}, number[] (integer, positive and safe) and <= ${setRaw.length}, or undefined!`);
        }
    }
    else if (typeof size === "undefined" && typeof sizeMaximum !== "undefined" && typeof sizeMinimum !== "undefined") {
        if (!(typeof sizeMaximum === "number" && numberIPSFilter.test(sizeMaximum) && sizeMaximum <= setRaw.length)) {
            throw new TypeError(`Argument \`sizeMaximum\` must be type of number (integer, positive and safe) and <= ${setRaw.length}!`);
        }
        if (!(typeof sizeMinimum === "number" && numberIPSFilter.test(sizeMinimum) && sizeMinimum <= sizeMaximum)) {
            throw new TypeError(`Argument \`sizeMinimum\` must be type of number (integer, positive and safe) and <= ${sizeMaximum}!`);
        }
        for (let index = sizeMinimum; index <= sizeMaximum; index++) {
            sizesRaw.add(index);
        }
    }
    else {
        throw new SyntaxError(`Arguments \`size\`, or \`sizeMaximum\` and \`sizeMinimum\` must be defined; or arguments \`size\`, \`sizeMaximum\` and \`sizeMinimum\` must be type of undefined!`);
    }
    if (setRaw.length === 0 ||
        sizesRaw.size === 0) {
        yield [];
        return;
    }
    let storage = new Set();
    for (let sizeRaw of Array.from(sizesRaw).sort(numbersSorter)) {
        if (sizeRaw === 0) {
            yield [];
            continue;
        }
        for (let resultIndex of setationIndexIterator({
            allowRepeat,
            size: sizeRaw,
            set: setRaw.map((_value, index) => {
                return index;
            })
        })) {
            let resultIndexResolve = considerOrder ? resultIndex : resultIndex.sort(numbersSorter);
            let resultIndexResolveToken = JSON.stringify(resultIndexResolve);
            if (storage.has(resultIndexResolveToken)) {
                continue;
            }
            storage.add(resultIndexResolveToken);
            yield resultIndexResolve.map((value) => {
                return setRaw[value];
            });
        }
    }
}
/**
 * @function combination
 * @description List combinations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {number | number[] | SetationOptions} [param1]
 * @param {number} [param2]
 * @returns {Generator<T[], void, unknown>} A combinations subset generator.
 */
function combination(set, param1, param2) {
    let commonOptions = {
        considerOrder: false,
        set
    };
    if (typeof param1 === "undefined" && typeof param2 === "undefined") {
        return setation(commonOptions);
    }
    if ((typeof param1 === "number" ||
        Array.isArray(param1)) && typeof param2 === "undefined") {
        return setation({
            ...commonOptions,
            size: param1
        });
    }
    if (typeof param1 === "number" && typeof param2 === "number") {
        return setation({
            ...commonOptions,
            sizeMaximum: param2,
            sizeMinimum: param1
        });
    }
    return setation({
        ...commonOptions,
        //@ts-ignore
        ...param1
    });
}
/**
 * @function combination
 * @description List permutations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {number | number[] | SetationOptions} [param1]
 * @param {number} [param2]
 * @returns {Generator<T[], void, unknown>} A permutations subset generator.
 */
function permutation(set, param1, param2) {
    let commonOptions = {
        considerOrder: true,
        set
    };
    if (typeof param1 === "undefined" && typeof param2 === "undefined") {
        return setation(commonOptions);
    }
    if ((typeof param1 === "number" ||
        Array.isArray(param1)) && typeof param2 === "undefined") {
        return setation({
            ...commonOptions,
            size: param1
        });
    }
    if (typeof param1 === "number" && typeof param2 === "number") {
        return setation({
            ...commonOptions,
            sizeMaximum: param2,
            sizeMinimum: param1
        });
    }
    return setation({
        ...commonOptions,
        //@ts-ignore
        ...param1
    });
}
export { combination, permutation };

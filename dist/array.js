/**
 * @access private
 * @function sorterForNumbers
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sorterForNumbers(a, b) {
    return (a - b);
}
/**
 * @access private
 * @generator setationArrayIndexIterator
 * @param {SetationArrayIndexIteratorParameters} param
 * @returns {Generator<number[], void, unknown>} An array subset index generator.
 */
function* setationArrayIndexIterator(param) {
    let { allowRepeat = false, chain = [], set, size } = param;
    for (let setElement of set) {
        let chainCurrent = [...chain, setElement];
        if (chainCurrent.length === size) {
            yield chainCurrent;
        }
        else {
            for (let item of setationArrayIndexIterator({
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
/**
 * @access private
 * @generator setationArray
 * @template {unknown} T
 * @param {SetationArrayInternalParameters<T>} param
 * @returns {Generator<T[], void, unknown>} A subset generator.
 */
function* setationArray(param) {
    let { allowRepeat = false, considerOrder, size, sizeMaximum, sizeMinimum, set } = param;
    let setRaw;
    if (Array.isArray(set)) {
        setRaw = [...set];
    }
    else if (set instanceof Set) {
        setRaw = Array.from(set.values());
    }
    else {
        throw new TypeError(`Argument \`set\` must be instance of Set, or type of array!`);
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
    if (allowRepeat && typeof size === "undefined" && typeof sizeMaximum === "undefined" && typeof sizeMinimum === "undefined") {
        throw new SyntaxError(`When argument \`allowRepeat\` is \`true\`, argument \`size\`, or arguments \`sizeMaximum\` and \`sizeMinimum\` must be defined!`);
    }
    if (!allowRepeat && typeof size === "undefined" && typeof sizeMaximum === "undefined" && typeof sizeMinimum === "undefined") {
        for (let index = 1; index <= setRaw.length; index++) {
            sizesRaw.add(index);
        }
    }
    else if (typeof size !== "undefined" && typeof sizeMaximum === "undefined" && typeof sizeMinimum === "undefined") {
        if (!Array.isArray(size)) {
            size = [size];
        }
        if (!size.every((value) => {
            if (!(typeof value === "number" && !Number.isNaN(value) && Number.isSafeInteger(value) && value >= 0) ||
                (!allowRepeat && !(value <= setRaw.length))) {
                return false;
            }
            return true;
        })) {
            throw new TypeError(`Argument \`size\` must be type of number (integer, positive, safe and <= ${setRaw.length}), number[] (integer, positive, safe and <= ${setRaw.length}), or undefined!`);
        }
        size.forEach((value) => {
            sizesRaw.add(value);
        });
    }
    else if (typeof size === "undefined" && typeof sizeMaximum !== "undefined" && typeof sizeMinimum !== "undefined") {
        if (!(typeof sizeMaximum === "number" && !Number.isNaN(sizeMaximum))) {
            throw new TypeError(`Argument \`sizeMaximum\` must be type of number!`);
        }
        if (!(Number.isSafeInteger(sizeMaximum) && sizeMaximum >= 0) ||
            (!allowRepeat && !(sizeMaximum <= setRaw.length))) {
            throw new RangeError(`Argument \`sizeMaximum\` must be a number which is integer, positive${allowRepeat ? ` and safe` : `, safe, and <= ${setRaw.length}`}!`);
        }
        if (!(typeof sizeMinimum === "number" && !Number.isNaN(sizeMinimum))) {
            throw new TypeError(`Argument \`sizeMinimum\` must be type of number!`);
        }
        if (!(Number.isSafeInteger(sizeMinimum) && sizeMinimum >= 0 && sizeMinimum <= sizeMaximum)) {
            throw new RangeError(`Argument \`sizeMinimum\` must be a number which is integer, positive, safe, and <= ${sizeMaximum}!`);
        }
        for (let index = sizeMinimum; index <= sizeMaximum; index++) {
            sizesRaw.add(index);
        }
    }
    else {
        throw new SyntaxError(`Argument \`size\`, or arguments \`sizeMaximum\` and \`sizeMinimum\` must be defined; or arguments \`size\`, \`sizeMaximum\` and \`sizeMinimum\` must be type of undefined!`);
    }
    if (setRaw.length === 0 ||
        sizesRaw.size === 0) {
        yield [];
        return;
    }
    let storage = new Set();
    for (let sizeRaw of Array.from(sizesRaw).sort(sorterForNumbers)) {
        if (sizeRaw === 0) {
            yield [];
            continue;
        }
        for (let resultIndex of setationArrayIndexIterator({
            allowRepeat,
            size: sizeRaw,
            set: setRaw.map((_value, index) => {
                return index;
            })
        })) {
            let resultIndexResolve = considerOrder ? resultIndex : resultIndex.sort(sorterForNumbers);
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
 * @param {number | number[] | SetationArrayOptions} [param1]
 * @param {number} [param2]
 * @returns {Generator<T[], void, unknown>} A combinations subset generator.
 */
function combination(set, param1, param2) {
    let commonOptions = {
        considerOrder: false,
        set
    };
    if (typeof param1 === "undefined" && typeof param2 === "undefined") {
        return setationArray(commonOptions);
    }
    if ((typeof param1 === "number" ||
        Array.isArray(param1)) && typeof param2 === "undefined") {
        return setationArray({
            ...commonOptions,
            size: param1
        });
    }
    if (typeof param1 === "number" && typeof param2 === "number") {
        return setationArray({
            ...commonOptions,
            sizeMaximum: param2,
            sizeMinimum: param1
        });
    }
    return setationArray({
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
 * @param {number | number[] | SetationArrayOptions} [param1]
 * @param {number} [param2]
 * @returns {Generator<T[], void, unknown>} A permutations subset generator.
 */
function permutation(set, param1, param2) {
    let commonOptions = {
        considerOrder: true,
        set
    };
    if (typeof param1 === "undefined" && typeof param2 === "undefined") {
        return setationArray(commonOptions);
    }
    if ((typeof param1 === "number" ||
        Array.isArray(param1)) && typeof param2 === "undefined") {
        return setationArray({
            ...commonOptions,
            size: param1
        });
    }
    if (typeof param1 === "number" && typeof param2 === "number") {
        return setationArray({
            ...commonOptions,
            sizeMaximum: param2,
            sizeMinimum: param1
        });
    }
    return setationArray({
        ...commonOptions,
        //@ts-ignore
        ...param1
    });
}
export { combination, permutation };

/**
 * @access private
 * @function objectSlice
 * @template {unknown} T
 * @param {{ [x: string]: T; }} o Object.
 * @param {string} key Key.
 * @returns {{ [x: string]: T; }}
 */
function objectSlice(o, key) {
    let oClone = { ...o };
    delete oClone[key];
    return oClone;
}
/**
 * @access private
 * @generator setationObjectIterator
 * @template {unknown} V
 * @param {{ [x: string]: V[]; }} set
 * @param {Map<string, V>} chain
 * @returns {Generator<{ [x: string]: V; }, void, unknown>}
 */
function* setationObjectIterator(set, chain = new Map()) {
    let entriesCurrentKey = Object.keys(set)[0];
    let entriesRest = objectSlice(set, entriesCurrentKey);
    for (let entryCurrentValue of set[entriesCurrentKey]) {
        chain.set(entriesCurrentKey, entryCurrentValue);
        if (Object.entries(entriesRest).length === 0) {
            let result = {};
            chain.forEach((value, key) => {
                result[key] = value;
            });
            yield result;
        }
        else {
            for (let item of setationObjectIterator(entriesRest, chain)) {
                yield item;
            }
        }
    }
}
/**
 * @generator setationObject
 * @description List combinations from a object.
 * @template {unknown} V
 * @param {{ [x: string]: V | V[]; } | Map<string, V | V[]>} set Set.
 * @returns {Generator<{ [x: string]: V; }, void, unknown>} A combinations subset generator.
 */
function* setationObject(set) {
    let setResolve = {};
    if (set instanceof Map) {
        if (!Array.from(set.keys()).every((key) => {
            return (typeof key === "string" && key.length > 0);
        })) {
            throw new TypeError(`Argument \`set[key]\` must be type of string (non-empty)!`);
        }
        for (let [key, value] of set.entries()) {
            setResolve[key] = Array.isArray(value) ? value : [value];
        }
    }
    else {
        for (let [key, value] of Object.entries(set)) {
            setResolve[key] = Array.isArray(value) ? value : [value];
        }
    }
    if (Object.entries(setResolve).length === 0) {
        yield {};
        return;
    }
    for (let item of setationObjectIterator(setResolve)) {
        yield item;
    }
}
export { setationObject as combinationMatrix };

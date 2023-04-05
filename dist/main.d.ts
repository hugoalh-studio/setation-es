/**
 * @function combination
 * @description List combinations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {number} select Select.
 * @returns {Generator<T[], void, unknown>} A combinations subset generator.
 */
declare function combination<T>(set: T[] | Set<T>, select: number): Generator<T[], void, unknown>;
/**
 * @function permutation
 * @description List permutations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {number} select Select.
 * @returns {Generator<T[], void, unknown>} A permutations subset generator.
 */
declare function permutation<T>(set: T[] | Set<T>, select: number): Generator<T[], void, unknown>;
export { combination, permutation };
//# sourceMappingURL=main.d.ts.map
interface SetationArrayOptions {
    /**
     * @property allowRepeat
     * @description Whether to allow the same element repeat appear in the same subset.
     * @default false
     */
    allowRepeat?: boolean;
    /**
     * @property select
     * @description Size of the subset.
     * @default undefined
     */
    size?: number | number[];
    /**
     * @property selectMaximum
     * @description Maximum size of the subset.
     * @default undefined
     */
    sizeMaximum?: number;
    /**
     * @property selectMinimum
     * @description Minimum size of the subset.
     * @default undefined
     */
    sizeMinimum?: number;
}
/**
 * @function combination
 * @description List combinations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {number | number[]} size Size of the subset.
 * @returns {Generator<T[], void, unknown>} A combinations subset generator.
 */
declare function combination<T>(set: T[] | Set<T>, size: number | number[]): Generator<T[], void, unknown>;
/**
 * @function combination
 * @description List combinations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {number} sizeMinimum Minimum size of the subset.
 * @param {number} sizeMaximum Maximum size of the subset.
 * @returns {Generator<T[], void, unknown>} A combinations subset generator.
 */
declare function combination<T>(set: T[] | Set<T>, sizeMinimum: number, sizeMaximum: number): Generator<T[], void, unknown>;
/**
 * @function combination
 * @description List combinations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {SetationArrayOptions} [options] Options.
 * @returns {Generator<T[], void, unknown>} A combinations subset generator.
 */
declare function combination<T>(set: T[] | Set<T>, options?: SetationArrayOptions): Generator<T[], void, unknown>;
/**
 * @function permutation
 * @description List permutations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {number | number[]} size Size of the subset.
 * @returns {Generator<T[], void, unknown>} A permutations subset generator.
 */
declare function permutation<T>(set: T[] | Set<T>, size: number | number[]): Generator<T[], void, unknown>;
/**
 * @function permutation
 * @description List permutations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {number} sizeMinimum Minimum size of the subset.
 * @param {number} sizeMaximum Maximum size of the subset.
 * @returns {Generator<T[], void, unknown>} A permutations subset generator.
 */
declare function permutation<T>(set: T[] | Set<T>, sizeMinimum: number, sizeMaximum: number): Generator<T[], void, unknown>;
/**
 * @function permutation
 * @description List permutations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {SetationArrayOptions} [options] Options.
 * @returns {Generator<T[], void, unknown>} A permutations subset generator.
 */
declare function permutation<T>(set: T[] | Set<T>, options?: SetationArrayOptions): Generator<T[], void, unknown>;
export { combination, permutation, type SetationArrayOptions as CombinationOptions, type SetationArrayOptions as PermutationOptions };
//# sourceMappingURL=array.d.ts.map
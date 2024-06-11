/**
 * Sort numeric array in ascending order.
 * @access private
 * @template {bigint | number} T
 * @param {T} a
 * @param {T} b
 * @returns {number}
 */
function sortNumericAscend<T extends bigint | number>(a: T, b: T): number {
	if (a < b) {
		return -1;
	}
	if (a > b) {
		return 1;
	}
	return 0;
}
interface SetationSetIndexIteratorParameters {
	allowRepeat?: boolean;
	chain?: number[];
	set: number[];
	size: number;
}
/**
 * Iterate set index.
 * @access private
 * @param {SetationSetIndexIteratorParameters} param0
 * @returns {Generator<number[]>}
 */
function* setationSetIndexIterator({
	allowRepeat = false,
	chain = [],
	set,
	size
}: SetationSetIndexIteratorParameters): Generator<number[]> {
	for (const value of set) {
		const chainNew: number[] = [...chain, value];
		if (chainNew.length === size) {
			yield chainNew;
		} else {
			yield* setationSetIndexIterator({
				allowRepeat,
				chain: chainNew,
				set: allowRepeat ? set : set.filter((index: number): boolean => {
					return (index !== value);
				}),
				size
			});
		}
	}
}
export interface SetationSetSizeOptions {
	/**
	 * Maximum size of the subset.
	 */
	maximum: number;
	/**
	 * Minimum size of the subset.
	 */
	minimum: number;
}
export interface SetationSetOptions {
	/**
	 * Whether to allow the same element repeat appear in the same subset.
	 * 
	 * When this value is `true`, require property {@linkcode size}.
	 * @default false
	 */
	allowRepeat?: boolean;
	/**
	 * Size of the subset.
	 * @default undefined
	 */
	size?: number | number[] | SetationSetSizeOptions;
}
interface SetationSetParameters<T> extends SetationSetOptions {
	considerOrder: boolean;
	set: T[] | Set<T>;
}
function* setationSet<T>({
	allowRepeat = false,
	considerOrder,
	size,
	set
}: SetationSetParameters<T>): Generator<T[]> {
	const setFmt: T[] = (set instanceof Set) ? Array.from(set.values()) : [...set];
	const sizesResolve: number[] = [];
	if (allowRepeat && (
		typeof size === "undefined" ||
		(Array.isArray(size) && size.length === 0)
	)) {
		throw new SyntaxError(`Parameter \`options.size\` must be defined when parameter \`options.allowRepeat\` is \`true\`!`);
	}
	if (typeof size === "undefined") {
		for (let index = 1; index <= setFmt.length; index += 1) {
			sizesResolve.push(index);
		}
	} else if (
		typeof size === "number" ||
		Array.isArray(size)
	) {
		const sizesRaw: number[] = Array.isArray(size) ? size : [size];
		sizesRaw.forEach((value: number, index: number): void => {
			if (
				!(Number.isSafeInteger(value) && value >= 0) ||
				(!allowRepeat && !(value <= setFmt.length))
			) {
				throw new TypeError(`\`${value}\` (parameter \`options.size[${index}]\`) is not a number which is integer, positive, safe and <= ${setFmt.length}!`);
			}
		});
		sizesResolve.push(...sizesRaw);
	} else {
		const { maximum: sizeMaximum, minimum: sizeMinimum } = size;
		if (
			!(Number.isSafeInteger(sizeMaximum) && sizeMaximum >= 0) ||
			(!allowRepeat && !(sizeMaximum <= setFmt.length))
		) {
			throw new RangeError(`\`${sizeMaximum}\` (parameter \`options.size.maximum\`) is not a number which is integer, positive${allowRepeat ? " and safe" : `, safe, and <= ${setFmt.length}`}!`);
		}
		if (!(Number.isSafeInteger(sizeMinimum) && sizeMinimum >= 0 && sizeMinimum <= sizeMaximum)) {
			throw new RangeError(`\`${sizeMinimum}\` (parameter \`options.size.minimum\`) is not a number which is integer, positive, safe, and <= ${sizeMaximum}!`);
		}
		for (let index: number = sizeMinimum; index <= sizeMaximum; index += 1) {
			sizesResolve.push(index);
		}
	}
	if (
		setFmt.length === 0 ||
		sizesResolve.length === 0
	) {
		yield [];
		return;
	}
	for (const sizeResolve of sizesResolve) {
		if (sizeResolve === 0) {
			yield [];
			continue;
		}
		const patternsStorage: Set<string> = new Set<string>();
		for (const resultIndex of setationSetIndexIterator({
			allowRepeat,
			set: setFmt.map((_value: T, index: number): number => {
				return index;
			}),
			size: sizeResolve
		})) {
			const resultIndexResolve: number[] = considerOrder ? resultIndex : resultIndex.sort(sortNumericAscend);
			const resultIndexResolveToken: string = JSON.stringify(resultIndexResolve);
			if (patternsStorage.has(resultIndexResolveToken)) {
				continue;
			}
			patternsStorage.add(resultIndexResolveToken);
			yield resultIndexResolve.map((value: number): T => {
				return setFmt[value];
			});
		}
	}
}
/**
 * List combinations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {SetationSetOptions} [options={}] Options.
 * @returns {Generator<T[]>} A combinations subset generator.
 */
export function combinationSet<T>(set: T[] | Set<T>, options?: SetationSetOptions): Generator<T[]> {
	return setationSet<T>({
		...options,
		considerOrder: false,
		set
	});
}
/**
 * List permutations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {SetationSetOptions} [options={}] Options.
 * @returns {Generator<T[]>} A permutations subset generator.
 */
export function permutationSet<T>(set: T[] | Set<T>, options: SetationSetOptions = {}): Generator<T[]> {
	return setationSet<T>({
		...options,
		considerOrder: true,
		set
	});
}

function sortNumericAscend<T extends bigint | number>(a: T, b: T): -1 | 0 | 1 {
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
export interface SetationSetOptions {
	/**
	 * Whether to allow the same element repeat appear in the same subset.
	 * 
	 * When this value is `true`, require option {@linkcode size}, or options {@linkcode sizeMaximum} and {@linkcode sizeMinimum}.
	 * @default false
	 */
	allowRepeat?: boolean;
	/**
	 * Fixed size of the subset.
	 * 
	 * Conflict with options {@linkcode sizeMaximum} and {@linkcode sizeMinimum}.
	 * @default undefined
	 */
	size?: number | number[];
	/**
	 * Maximum size of the subset.
	 * 
	 * Require option {@linkcode sizeMinimum}.
	 * 
	 * Conflict with option {@linkcode size}.
	 * @default undefined
	 */
	sizeMaximum?: number;
	/**
	 * Minimum size of the subset.
	 * 
	 * Require option {@linkcode sizeMaximum}.
	 * 
	 * Conflict with option {@linkcode size}.
	 * @default undefined
	 */
	sizeMinimum?: number;
}
interface SetationSetParameters<T> extends SetationSetOptions {
	considerOrder: boolean;
	set: T[] | Set<T>;
}
function* setationSet<T>({
	allowRepeat = false,
	considerOrder,
	size,
	sizeMaximum,
	sizeMinimum,
	set
}: SetationSetParameters<T>): Generator<T[]> {
	const setResolve: T[] = (set instanceof Set) ? Array.from(set.values()) : [...set];
	const sizesResolve: number[] = [];
	if (typeof size !== "undefined" && (
		typeof sizeMaximum !== "undefined" ||
		typeof sizeMinimum !== "undefined"
	)) {
		throw new SyntaxError(`Argument \`options.size\` must not defined with arguments \`options.sizeMaximum\` and/or \`options.sizeMinimum\`!`);
	}
	if (allowRepeat && !(
		typeof size !== "undefined" ||
		(typeof sizeMaximum !== "undefined" && typeof sizeMinimum !== "undefined")
	)) {
		throw new SyntaxError(`When argument \`options.allowRepeat\` is \`true\`, argument \`options.size\` or arguments \`options.sizeMaximum\` and \`options.sizeMinimum\` must be defined!`);
	}
	if (typeof size === "undefined" && typeof sizeMaximum === "undefined" && typeof sizeMinimum === "undefined") {
		for (let index = 1; index <= setResolve.length; index += 1) {
			sizesResolve.push(index);
		}
	} else if (typeof size !== "undefined") {
		if (!Array.isArray(size)) {
			size = [size];
		}
		if (!size.every((value: number): boolean => {
			if (
				!(Number.isSafeInteger(value) && value >= 0) ||
				(!allowRepeat && !(value <= setResolve.length))
			) {
				return false;
			}
			return true;
		})) {
			throw new TypeError(`Argument \`options.size\` is not a number or a number[] which is integer, positive, safe and <= ${setResolve.length}!`);
		}
		sizesResolve.push(...size);
	} else if (typeof sizeMaximum !== "undefined" && typeof sizeMinimum !== "undefined") {
		if (
			!(Number.isSafeInteger(sizeMaximum) && sizeMaximum >= 0) ||
			(!allowRepeat && !(sizeMaximum <= setResolve.length))
		) {
			throw new RangeError(`Argument \`options.sizeMaximum\` is not a number which is integer, positive${allowRepeat ? " and safe" : `, safe, and <= ${setResolve.length}`}!`);
		}
		if (!(Number.isSafeInteger(sizeMinimum) && sizeMinimum >= 0 && sizeMinimum <= sizeMaximum)) {
			throw new RangeError(`Argument \`options.sizeMinimum\` is not a number which is integer, positive, safe, and <= ${sizeMaximum}!`);
		}
		for (let index: number = sizeMinimum; index <= sizeMaximum; index += 1) {
			sizesResolve.push(index);
		}
	} else {
		throw new SyntaxError(`Argument \`options.size\` or arguments \`options.sizeMaximum\` and \`options.sizeMinimum\` must be defined or all undefined!`);
	}
	if (
		setResolve.length === 0 ||
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
			set: setResolve.map((_value: T, index: number): number => {
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
				return setResolve[value];
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
export function combinationSet<T>(set: T[] | Set<T>, options: SetationSetOptions = {}): Generator<T[]> {
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

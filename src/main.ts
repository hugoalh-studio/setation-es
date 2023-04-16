import { NumberItemFilter } from "@hugoalh/advanced-determine";
const numberIPSFilter = new NumberItemFilter({
	integer: true,
	positive: true,
	safe: true
});
interface SetationIndexIteratorParameters {
	allowRepeat?: boolean;
	chain?: number[];
	set: number[];
	size: number;
}
interface SetationOptions {
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
interface SetationInternalParameters<T> extends SetationOptions {
	considerOrder: boolean;
	set: T[] | Set<T>;
}
/**
 * @access private
 * @function numbersSorter
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function numbersSorter(a: number, b: number): number {
	return (a - b);
}
/**
 * @access private
 * @generator setationIndexIterator
 * @param {SetationIndexIteratorParameters} param
 * @returns {Generator<number[], void, unknown>} A subset index generator.
 */
function* setationIndexIterator(param: SetationIndexIteratorParameters): Generator<number[], void, unknown> {
	let {
		allowRepeat = false,
		chain = [],
		set,
		size
	} = param;
	for (let setElement of set) {
		let chainCurrent: number[] = [...chain, setElement];
		if (chainCurrent.length === size) {
			yield chainCurrent;
		} else {
			for (let item of setationIndexIterator({
				...param,
				chain: chainCurrent,
				set: allowRepeat ? set : set.filter((value: number): boolean => {
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
 * @generator setation
 * @template {unknown} T
 * @param {SetationInternalParameters<T>} param
 * @returns {Generator<T[], void, unknown>} A subset generator.
 */
function* setation<T>(param: SetationInternalParameters<T>): Generator<T[], void, unknown> {
	let {
		allowRepeat = false,
		considerOrder,
		size,
		sizeMaximum,
		sizeMinimum,
		set
	} = param;
	let setRaw: T[];
	if (Array.isArray(set)) {
		setRaw = set.map((value: T): T => {
			return value;
		});
	} else if (set instanceof Set) {
		setRaw = Array.from(set.values());
	} else {
		throw new TypeError(`Argument \`set\` must be type of array or set!`);
	}
	if (typeof allowRepeat !== "boolean") {
		throw new TypeError(`Argument \`allowRepeat\` must be type of boolean!`);
	}
	if (typeof considerOrder !== "boolean") {
		throw new TypeError(`Argument \`considerOrder\` must be type of boolean!`);
	}
	let sizesRaw: Set<number> = new Set<number>();
	if (typeof size !== "undefined" && (
		typeof sizeMaximum !== "undefined" ||
		typeof sizeMinimum !== "undefined"
	)) {
		throw new SyntaxError(`Argument \`size\` must not defined with arguments \`sizeMaximum\` and/or \`sizeMinimum\`!`);
	}
	if (typeof size === "undefined" && typeof sizeMaximum === "undefined" && typeof sizeMinimum === "undefined") {
		for (let index = 1; index <= setRaw.length; index++) {
			sizesRaw.add(index);
		}
	} else if (typeof size !== "undefined" && typeof sizeMaximum === "undefined" && typeof sizeMinimum === "undefined") {
		if (Array.isArray(size) && size.every((value: number): boolean => {
			return (typeof value === "number" && numberIPSFilter.test(value) && value <= setRaw.length);
		})) {
			size.forEach((value: number): void => {
				sizesRaw.add(value);
			});
		} else if (typeof size === "number" && numberIPSFilter.test(size) && size <= setRaw.length) {
			sizesRaw.add(size);
		} else {
			throw new TypeError(`Argument \`size\` must be type of number (integer, positive and safe) and <= ${setRaw.length}, number[] (integer, positive and safe) and <= ${setRaw.length}, or undefined!`);
		}
	} else if (typeof size === "undefined" && typeof sizeMaximum !== "undefined" && typeof sizeMinimum !== "undefined") {
		if (!(typeof sizeMaximum === "number" && numberIPSFilter.test(sizeMaximum) && sizeMaximum <= setRaw.length)) {
			throw new TypeError(`Argument \`sizeMaximum\` must be type of number (integer, positive and safe) and <= ${setRaw.length}!`);
		}
		if (!(typeof sizeMinimum === "number" && numberIPSFilter.test(sizeMinimum) && sizeMinimum <= sizeMaximum)) {
			throw new TypeError(`Argument \`sizeMinimum\` must be type of number (integer, positive and safe) and <= ${sizeMaximum}!`);
		}
		for (let index: number = sizeMinimum; index <= sizeMaximum; index++) {
			sizesRaw.add(index);
		}
	} else {
		throw new SyntaxError(`Arguments \`size\`, or \`sizeMaximum\` and \`sizeMinimum\` must be defined; or arguments \`size\`, \`sizeMaximum\` and \`sizeMinimum\` must be type of undefined!`);
	}
	if (
		setRaw.length === 0 ||
		sizesRaw.size === 0
	) {
		yield [];
		return;
	}
	let storage: Set<string> = new Set<string>();
	for (let sizeRaw of Array.from(sizesRaw).sort(numbersSorter)) {
		if (sizeRaw === 0) {
			yield [];
			continue;
		}
		for (let resultIndex of setationIndexIterator({
			allowRepeat,
			size: sizeRaw,
			set: setRaw.map((_value: T, index: number): number => {
				return index;
			})
		})) {
			let resultIndexResolve: number[] = considerOrder ? resultIndex : resultIndex.sort(numbersSorter);
			let resultIndexResolveToken: string = JSON.stringify(resultIndexResolve);
			if (storage.has(resultIndexResolveToken)) {
				continue;
			}
			storage.add(resultIndexResolveToken);
			yield resultIndexResolve.map((value: number): T => {
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
 * @param {number | number[]} size Size of the subset.
 * @returns {Generator<T[], void, unknown>} A combinations subset generator.
 */
function combination<T>(set: T[] | Set<T>, size: number | number[]): Generator<T[], void, unknown>;
/**
 * @function combination
 * @description List combinations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {number} sizeMinimum Minimum size of the subset.
 * @param {number} sizeMaximum Maximum size of the subset.
 * @returns {Generator<T[], void, unknown>} A combinations subset generator.
 */
function combination<T>(set: T[] | Set<T>, sizeMinimum: number, sizeMaximum: number): Generator<T[], void, unknown>;
/**
 * @function combination
 * @description List combinations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {SetationOptions} [options] Options.
 * @returns {Generator<T[], void, unknown>} A combinations subset generator.
 */
function combination<T>(set: T[] | Set<T>, options?: SetationOptions): Generator<T[], void, unknown>;
/**
 * @function combination
 * @description List combinations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {number | number[] | SetationOptions} [param1]
 * @param {number} [param2]
 * @returns {Generator<T[], void, unknown>} A combinations subset generator.
 */
function combination<T>(set: T[] | Set<T>, param1?: number | number[] | SetationOptions, param2?: number): Generator<T[], void, unknown> {
	let commonOptions: SetationInternalParameters<T> = {
		considerOrder: false,
		set
	};
	if (typeof param1 === "undefined" && typeof param2 === "undefined") {
		return setation<T>(commonOptions);
	}
	if ((
		typeof param1 === "number" ||
		Array.isArray(param1)
	) && typeof param2 === "undefined") {
		return setation<T>({
			...commonOptions,
			size: param1
		});
	}
	if (typeof param1 === "number" && typeof param2 === "number") {
		return setation<T>({
			...commonOptions,
			sizeMaximum: param2,
			sizeMinimum: param1
		});
	}
	return setation<T>({
		...commonOptions,
		//@ts-ignore
		...param1
	});
}
/**
 * @function permutation
 * @description List permutations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {number | number[]} size Size of the subset.
 * @returns {Generator<T[], void, unknown>} A permutations subset generator.
 */
function permutation<T>(set: T[] | Set<T>, size: number | number[]): Generator<T[], void, unknown>;
/**
 * @function permutation
 * @description List permutations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {number} sizeMinimum Minimum size of the subset.
 * @param {number} sizeMaximum Maximum size of the subset.
 * @returns {Generator<T[], void, unknown>} A permutations subset generator.
 */
function permutation<T>(set: T[] | Set<T>, sizeMinimum: number, sizeMaximum: number): Generator<T[], void, unknown>;
/**
 * @function permutation
 * @description List permutations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {SetationOptions} [options] Options.
 * @returns {Generator<T[], void, unknown>} A permutations subset generator.
 */
function permutation<T>(set: T[] | Set<T>, options?: SetationOptions): Generator<T[], void, unknown>;
/**
 * @function combination
 * @description List permutations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {number | number[] | SetationOptions} [param1]
 * @param {number} [param2]
 * @returns {Generator<T[], void, unknown>} A permutations subset generator.
 */
function permutation<T>(set: T[] | Set<T>, param1?: number | number[] | SetationOptions, param2?: number): Generator<T[], void, unknown> {
	let commonOptions: SetationInternalParameters<T> = {
		considerOrder: true,
		set
	};
	if (typeof param1 === "undefined" && typeof param2 === "undefined") {
		return setation<T>(commonOptions);
	}
	if ((
		typeof param1 === "number" ||
		Array.isArray(param1)
	) && typeof param2 === "undefined") {
		return setation<T>({
			...commonOptions,
			size: param1
		});
	}
	if (typeof param1 === "number" && typeof param2 === "number") {
		return setation<T>({
			...commonOptions,
			sizeMaximum: param2,
			sizeMinimum: param1
		});
	}
	return setation<T>({
		...commonOptions,
		//@ts-ignore
		...param1
	});
}
export {
	combination,
	permutation,
	type SetationOptions as CombinationOptions,
	type SetationOptions as PermutationOptions
};

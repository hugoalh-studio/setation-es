/**
 * @access private
 * @function sorterForNumbers
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sorterForNumbers(a: number, b: number): number {
	return (a - b);
}
interface SetationArrayIndexIteratorParameters {
	allowRepeat?: boolean;
	chain?: number[];
	set: number[];
	size: number;
}
/**
 * @access private
 * @generator setationArrayIndexIterator
 * @param {SetationArrayIndexIteratorParameters} param
 * @returns {Generator<number[], void, unknown>} An array subset index generator.
 */
function* setationArrayIndexIterator(param: SetationArrayIndexIteratorParameters): Generator<number[], void, unknown> {
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
			for (let item of setationArrayIndexIterator({
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
interface SetationArrayInternalParameters<T> extends SetationArrayOptions {
	considerOrder: boolean;
	set: T[] | Set<T>;
}
/**
 * @access private
 * @generator setationArray
 * @template {unknown} T
 * @param {SetationArrayInternalParameters<T>} param
 * @returns {Generator<T[], void, unknown>} A subset generator.
 */
function* setationArray<T>(param: SetationArrayInternalParameters<T>): Generator<T[], void, unknown> {
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
		setRaw = [...set];
	} else if (set instanceof Set) {
		setRaw = Array.from(set.values());
	} else {
		throw new TypeError(`Argument \`set\` must be instance of Set, or type of array!`);
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
	if (allowRepeat && typeof size === "undefined" && typeof sizeMaximum === "undefined" && typeof sizeMinimum === "undefined") {
		throw new SyntaxError(`When argument \`allowRepeat\` is \`true\`, argument \`size\`, or arguments \`sizeMaximum\` and \`sizeMinimum\` must be defined!`);
	}
	if (!allowRepeat && typeof size === "undefined" && typeof sizeMaximum === "undefined" && typeof sizeMinimum === "undefined") {
		for (let index = 1; index <= setRaw.length; index++) {
			sizesRaw.add(index);
		}
	} else if (typeof size !== "undefined" && typeof sizeMaximum === "undefined" && typeof sizeMinimum === "undefined") {
		if (!Array.isArray(size)) {
			size = [size];
		}
		if (!size.every((value: number): boolean => {
			if (
				!(typeof value === "number" && !Number.isNaN(value) && Number.isSafeInteger(value) && value >= 0) ||
				(!allowRepeat && !(value <= setRaw.length))
			) {
				return false;
			}
			return true;
		})) {
			throw new TypeError(`Argument \`size\` must be type of number (integer, positive, safe and <= ${setRaw.length}), number[] (integer, positive, safe and <= ${setRaw.length}), or undefined!`);
		}
		size.forEach((value: number): void => {
			sizesRaw.add(value);
		});
	} else if (typeof size === "undefined" && typeof sizeMaximum !== "undefined" && typeof sizeMinimum !== "undefined") {
		if (!(typeof sizeMaximum === "number" && !Number.isNaN(sizeMaximum))) {
			throw new TypeError(`Argument \`sizeMaximum\` must be type of number!`);
		}
		if (
			!(Number.isSafeInteger(sizeMaximum) && sizeMaximum >= 0) ||
			(!allowRepeat && !(sizeMaximum <= setRaw.length))
		) {
			throw new RangeError(`Argument \`sizeMaximum\` must be a number which is integer, positive${allowRepeat ? ` and safe` : `, safe, and <= ${setRaw.length}`}!`);
		}
		if (!(typeof sizeMinimum === "number" && !Number.isNaN(sizeMinimum))) {
			throw new TypeError(`Argument \`sizeMinimum\` must be type of number!`);
		}
		if (!(Number.isSafeInteger(sizeMinimum) && sizeMinimum >= 0 && sizeMinimum <= sizeMaximum)) {
			throw new RangeError(`Argument \`sizeMinimum\` must be a number which is integer, positive, safe, and <= ${sizeMaximum}!`);
		}
		for (let index: number = sizeMinimum; index <= sizeMaximum; index++) {
			sizesRaw.add(index);
		}
	} else {
		throw new SyntaxError(`Argument \`size\`, or arguments \`sizeMaximum\` and \`sizeMinimum\` must be defined; or arguments \`size\`, \`sizeMaximum\` and \`sizeMinimum\` must be type of undefined!`);
	}
	if (
		setRaw.length === 0 ||
		sizesRaw.size === 0
	) {
		yield [];
		return;
	}
	let storage: Set<string> = new Set<string>();
	for (let sizeRaw of Array.from(sizesRaw).sort(sorterForNumbers)) {
		if (sizeRaw === 0) {
			yield [];
			continue;
		}
		for (let resultIndex of setationArrayIndexIterator({
			allowRepeat,
			size: sizeRaw,
			set: setRaw.map((_value: T, index: number): number => {
				return index;
			})
		})) {
			let resultIndexResolve: number[] = considerOrder ? resultIndex : resultIndex.sort(sorterForNumbers);
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
 * @param {SetationArrayOptions} [options] Options.
 * @returns {Generator<T[], void, unknown>} A combinations subset generator.
 */
function combination<T>(set: T[] | Set<T>, options?: SetationArrayOptions): Generator<T[], void, unknown>;
/**
 * @function combination
 * @description List combinations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {number | number[] | SetationArrayOptions} [param1]
 * @param {number} [param2]
 * @returns {Generator<T[], void, unknown>} A combinations subset generator.
 */
function combination<T>(set: T[] | Set<T>, param1?: number | number[] | SetationArrayOptions, param2?: number): Generator<T[], void, unknown> {
	let commonOptions: SetationArrayInternalParameters<T> = {
		considerOrder: false,
		set
	};
	if (typeof param1 === "undefined" && typeof param2 === "undefined") {
		return setationArray<T>(commonOptions);
	}
	if ((
		typeof param1 === "number" ||
		Array.isArray(param1)
	) && typeof param2 === "undefined") {
		return setationArray<T>({
			...commonOptions,
			size: param1
		});
	}
	if (typeof param1 === "number" && typeof param2 === "number") {
		return setationArray<T>({
			...commonOptions,
			sizeMaximum: param2,
			sizeMinimum: param1
		});
	}
	return setationArray<T>({
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
 * @param {SetationArrayOptions} [options] Options.
 * @returns {Generator<T[], void, unknown>} A permutations subset generator.
 */
function permutation<T>(set: T[] | Set<T>, options?: SetationArrayOptions): Generator<T[], void, unknown>;
/**
 * @function combination
 * @description List permutations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {number | number[] | SetationArrayOptions} [param1]
 * @param {number} [param2]
 * @returns {Generator<T[], void, unknown>} A permutations subset generator.
 */
function permutation<T>(set: T[] | Set<T>, param1?: number | number[] | SetationArrayOptions, param2?: number): Generator<T[], void, unknown> {
	let commonOptions: SetationArrayInternalParameters<T> = {
		considerOrder: true,
		set
	};
	if (typeof param1 === "undefined" && typeof param2 === "undefined") {
		return setationArray<T>(commonOptions);
	}
	if ((
		typeof param1 === "number" ||
		Array.isArray(param1)
	) && typeof param2 === "undefined") {
		return setationArray<T>({
			...commonOptions,
			size: param1
		});
	}
	if (typeof param1 === "number" && typeof param2 === "number") {
		return setationArray<T>({
			...commonOptions,
			sizeMaximum: param2,
			sizeMinimum: param1
		});
	}
	return setationArray<T>({
		...commonOptions,
		//@ts-ignore
		...param1
	});
}
export {
	combination,
	permutation,
	type SetationArrayOptions as CombinationOptions,
	type SetationArrayOptions as PermutationOptions
};

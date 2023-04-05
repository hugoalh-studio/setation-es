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
function* setationIndexIterator({
	chain = [],
	select,
	set
}: {
	chain?: number[];
	select: number;
	set: number[];
}): Generator<number[], void, unknown> {
	for (let index = 0; index < set.length; index++) {
		let current: number = set[index];
		let rest: number[] = [...set.slice(0, index), ...set.slice(index + 1)];
		if (chain.length + 1 === select) {
			yield [...chain, current];
		} else {
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
function* setation<T>(set: T[] | Set<T>, select: number, order = false): Generator<T[], void, unknown> {
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
	if (
		setRaw.length === 0 ||
		select === 0
	) {
		yield [];
		return;
	}
	if (setRaw.length === 1) {
		yield setRaw;
		return;
	}
	let setSub: Set<string> = new Set<string>();
	for (let resultIndex of setationIndexIterator({
		select,
		set: setRaw.map((_value: T, index: number): number => {
			return index;
		})
	})) {
		let resultIndexResolve: number[] = order ? resultIndex : resultIndex.sort((a: number, b: number): number => {
			return (a - b);
		});
		let resultIndexResolveToken: string = JSON.stringify(resultIndexResolve);
		if (setSub.has(resultIndexResolveToken)) {
			continue;
		}
		setSub.add(resultIndexResolveToken);
		yield resultIndexResolve.map((value: number): T => {
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
function combination<T>(set: T[] | Set<T>, select: number): Generator<T[], void, unknown> {
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
function permutation<T>(set: T[] | Set<T>, select: number): Generator<T[], void, unknown> {
	return setation(set, select, true);
}
export {
	combination,
	permutation
};

import { collection } from "./collection.js";
import { NumberItemFilter } from "@hugoalh/advanced-determine";
import uniqueArray from "@hugoalh/unique-array";
/**
 * @function combination
 * @description List combinations from a set.
 * @template {unknown} T
 * @param {T[] | Set<T>} set Set.
 * @param {number} [select=Infinity] Select.
 * @returns {T[][]} Combinations.
 */
function combination<T>(set: T[] | Set<T>, select = Infinity): T[][] {
	let raw: T[] = [];
	if (Array.isArray(set)) {
		raw = set.map((value: T): T => {
			return value;
		});
	} else if (set instanceof Set) {
		raw = Array.from(set.values());
	} else {
		throw new TypeError(`Argument \`set\` must be type of array or set!`);
	}
	if (select === Infinity) {
		select = raw.length;
	} else if (!(new NumberItemFilter({
		integer: true,
		maximum: raw.length,
		positive: true,
		safe: true
	}).test(select))) {
		throw new TypeError(`Argument \`select\` must be type of number (integer, positive and safe) and <= ${raw.length}!`);
	}
	if (
		raw.length === 0 ||
		select === 0
	) {
		return [];
	}
	if (
		raw.length === 1 ||
		select === raw.length
	) {
		return [raw];
	}
	return uniqueArray(collection(raw, select).map((row: number[]): number[] => {
		return row.sort((a: number, b: number): number => {
			return (a - b);
		});
	}), true).map((row: number[]): T[] => {
		return row.map((value: number): T => {
			return raw[value];
		});
	});
}
export {
	combination
};

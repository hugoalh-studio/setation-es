/**
 * @access private
 * @template {unknown} K
 * @template {unknown} V
 * @param {Map<K, V>} item
 * @param {K} key
 * @returns {Map<K, V>}
 */
function sliceMap<K, V>(item: Map<K, V>, key: K): Map<K, V> {
	let itemClone: Map<K, V> = new Map<K, V>(item);
	itemClone.delete(key);
	return itemClone;
}
/**
 * @access private
 * @template {unknown} K
 * @template {unknown} V
 * @param {Map<K, V[]>} set
 * @param {Map<K, V>} chain
 * @returns {Generator<Map<K, V>, void, unknown>}
 */
function* setationMapIterator<K, V>(set: Map<K, V[]>, chain: Map<K, V> = new Map<K, V>()): Generator<Map<K, V>, void, unknown> {
	let currentKey: K = Array.from(set.keys())[0];
	let rest: Map<K, V[]> = sliceMap<K, V[]>(set, currentKey);
	for (let currentValue of set.get(currentKey)) {
		chain.set(currentKey, currentValue);
		if (rest.size === 0) {
			yield new Map<K, V>(chain);
		} else {
			for (let item of setationMapIterator(rest, chain)) {
				yield item;
			}
		}
	}
}
/**
 * List combinations from a map.
 * @template {unknown} K
 * @template {unknown} V
 * @param {Map<K, V | V[]>} set Set.
 * @returns {Generator<Map<K, V>, void, unknown>} A combinations subset generator.
 */
export function combinationMatrix<K, V>(set: Map<K, V | V[]>): Generator<Map<K, V>, void, unknown>;
/**
 * List combinations from an object.
 * @template {unknown} V
 * @param {Record<string, V | V[]>} set Set.
 * @returns {Generator<Record<string, V>, void, unknown>} A combinations subset generator.
 */
export function combinationMatrix<V>(set: Record<string, V | V[]>): Generator<Record<string, V>, void, unknown>;
export function* combinationMatrix<K, V>(set: Map<K, V | V[]> | Record<string, V | V[]>) {
	let resultIsRecord = false;
	let setResolve: Map<K, V[]> = new Map<K, V[]>();
	if (set instanceof Map) {
		for (let [key, value] of set.entries()) {
			setResolve.set(key, Array.isArray(value) ? value : [value]);
		}
	} else {
		resultIsRecord = true;
		for (let [key, value] of Object.entries(set)) {
			setResolve.set(key as K, Array.isArray(value) ? value : [value]);
		}
	}
	if (setResolve.size === 0) {
		yield (resultIsRecord ? {} : new Map<K, V>());
		return;
	}
	for (let item of setationMapIterator(setResolve)) {
		if (resultIsRecord) {
			let result: Record<string, V> = {};
			for (let [key, value] of item.entries()) {
				result[key as string] = value;
			}
			yield result;
		} else {
			yield item;
		}
	}
}

/**
 * Delete keys from the `Map` out of the place.
 * @access private
 * @template {unknown} K
 * @template {unknown} V
 * @param {Map<K, V>} item
 * @param {...K} keys
 * @returns {Map<K, V>}
 */
function sliceMap<K, V>(item: Map<K, V>, ...keys: K[]): Map<K, V> {
	const itemClone: Map<K, V> = new Map<K, V>(item);
	for (const key of keys) {
		itemClone.delete(key);
	}
	return itemClone;
}
/**
 * Iterate setation `Map`.
 * @access private
 * @template {unknown} K
 * @template {unknown} V
 * @param {Map<K, V[]>} set
 * @param {Map<K, V>} [chain=new Map<K, V>()]
 * @returns {Generator<Map<K, V>>}
 */
function* setationMapIterator<K, V>(set: Map<K, V[]>, chain: Map<K, V> = new Map<K, V>()): Generator<Map<K, V>> {
	const currentKey: K = Array.from(set.keys())[0];
	const rest: Map<K, V[]> = sliceMap<K, V[]>(set, currentKey);
	for (const currentValue of set.get(currentKey)!) {
		chain.set(currentKey, currentValue);
		if (rest.size === 0) {
			yield new Map<K, V>(chain);
		} else {
			yield* setationMapIterator(rest, chain);
		}
	}
}
/**
 * List combinations from a matrix.
 * @template {unknown} V
 * @param {{ [x: string]: V[]; }} set Set.
 * @returns {Generator<{ [x: string]: V; }>} A matrix combinations subset generator.
 */
export function combinationMatrix<V>(set: { [x: string]: V[]; }): Generator<{ [x: string]: V; }>;
/**
 * List combinations from a matrix.
 * @template {unknown} K
 * @template {unknown} V
 * @param {Map<K, V[]>} set Set.
 * @returns {Generator<Map<K, V>>} A matrix combinations subset generator.
 */
export function combinationMatrix<K, V>(set: Map<K, V[]>): Generator<Map<K, V>>;
export function* combinationMatrix<K, V>(set: { [x: string]: V[]; } | Map<K, V[]>) {
	let resultIsMap = false;
	let setResolve: Map<K, V[]>;
	if (set instanceof Map) {
		resultIsMap = true;
		setResolve = new Map<K, V[]>(set);
	} else {
		setResolve = new Map<K, V[]>(Object.entries(set) as [K, V[]][]);
	}
	if (setResolve.size === 0) {
		yield (resultIsMap ? new Map<K, V>() : {});
		return;
	}
	for (const item of setationMapIterator(setResolve)) {
		yield (resultIsMap ? item : Object.fromEntries(item.entries()));
	}
}

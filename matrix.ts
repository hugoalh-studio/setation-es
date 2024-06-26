/**
 * Delete keys from the `Map` out of the place.
 * @access private
 * @template {unknown} K
 * @template {unknown} V
 * @param {Map<K, V[]>} item
 * @param {...K} keys
 * @returns {Map<K, V[]>}
 */
function sliceMap<K, V>(item: Map<K, V[]>, ...keys: K[]): Map<K, V[]> {
	const itemClone: Map<K, V[]> = new Map<K, V[]>(item);
	for (const key of keys) {
		itemClone.delete(key);
	}
	return itemClone;
}
/**
 * Iterate matrix.
 * @access private
 * @template {unknown} K
 * @template {unknown} V
 * @param {Map<K, V[]>} set
 * @param {Map<K, V>} [chain=new Map<K, V>()]
 * @returns {Generator<Map<K, V>>}
 */
function* setationMatrixIterator<K, V>(set: Map<K, V[]>, chain: Map<K, V> = new Map<K, V>()): Generator<Map<K, V>> {
	if (set.size === 0) {
		yield chain;
		return;
	}
	const currentKey: K = Array.from(set.keys())[0];
	const rest: Map<K, V[]> = sliceMap(set, currentKey);
	for (const currentValue of set.get(currentKey)!) {
		chain.set(currentKey, currentValue);
		if (rest.size === 0) {
			yield new Map<K, V>(chain);
		} else {
			yield* setationMatrixIterator(rest, chain);
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
	if (set instanceof Map) {
		yield* setationMatrixIterator(new Map<K, V[]>(set));
		return;
	}
	for (const item of setationMatrixIterator(new Map<K, V[]>(Object.entries(set) as [K, V[]][]))) {
		yield Object.fromEntries(item.entries());
	}
}

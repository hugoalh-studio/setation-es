/**
 * @function collectionIterator
 * @param {number[]} set Set in index form.
 * @param {number} layer Layer.
 * @returns {number[][]} Collections.
 */
function collectionIterator(set: number[], layer: number): number[][] {
	let result: number[][] = [];
	for (let index = 0; index < set.length; index++) {
		let current: number = set[index];
		let rest: number[] = [...set.slice(0, index), ...set.slice(index + 1)];
		if ((layer - 1) > 1) {
			for (let item of collectionIterator(rest, layer - 1)) {
				result.push([current, ...item]);
			}
		} else {
			for (let restItem of rest) {
				result.push([current, restItem]);
			}
		}
	}
	return result;
}
/**
 * @function collection
 * @param {unknown[]} set Set.
 * @param {number} select Select.
 * @returns {number[][]} Collections.
 */
function collection(set: unknown[], select: number): number[][] {
	return collectionIterator(set.map((_value: unknown, index: number): number => {
		return index;
	}), select);
}
export {
	collection
};

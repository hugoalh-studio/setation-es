import { assertEquals } from "STD/assert/assert_equals.ts";
import { combinationSet, permutationSet } from "./set.ts";
Deno.test("Set 1", { permissions: "none" }, async (t) => {
	const set = ["a", "b", "c", "d", "e", "f"];
	await t.step("Combination AllowRepeat 3", () => {
		const result = Array.from(combinationSet(set, {
			allowRepeat: true,
			size: 3
		}));
		console.log(result);
		assertEquals(result.length, 56);
	});
	await t.step("Combination NoRepeat 3", () => {
		const result = Array.from(combinationSet(set, { size: 3 }));
		console.log(result);
		assertEquals(result.length, 20);
	});
	await t.step("Combination NoRepeat 6", () => {
		const result = Array.from(combinationSet(set, { size: 6 }));
		console.log(result);
		assertEquals(result.length, 1);
	});
	await t.step("Permutation AllowRepeat 3", () => {
		const result = Array.from(permutationSet(set, {
			allowRepeat: true,
			size: 3
		}));
		console.log(result);
		assertEquals(result.length, 216);
	});
	await t.step("Permutation NoRepeat 3", () => {
		const result = Array.from(permutationSet(set, { size: 3 }));
		console.log(result);
		assertEquals(result.length, 120);
	});
	await t.step("Permutation NoRepeat 6", () => {
		const result = Array.from(permutationSet(set, { size: 6 }));
		console.log(result);
		assertEquals(result.length, 720);
	});
});

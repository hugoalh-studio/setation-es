import { assertEquals } from "STD/assert/assert-equals";
import { assertThrows } from "STD/assert/assert-throws";
import { combinationSet, permutationSet } from "./set.ts";
const set1 = ["a", "b", "c", "d", "e", "f"];
Deno.test("1 Combination AllowRepeat 3", { permissions: "none" }, () => {
	const result = Array.from(combinationSet(set1, {
		allowRepeat: true,
		size: 3
	}));
	console.log(result);
	assertEquals(result.length, 56);
});
Deno.test("1 Combination NoRepeat 3", { permissions: "none" }, () => {
	const result = Array.from(combinationSet(set1, { size: 3 }));
	console.log(result);
	assertEquals(result.length, 20);
});
Deno.test("1 Combination NoRepeat 6", { permissions: "none" }, () => {
	const result = Array.from(combinationSet(set1, { size: 6 }));
	console.log(result);
	assertEquals(result.length, 1);
});
Deno.test("1 Combination Simple 3", { permissions: "none" }, () => {
	const result = Array.from(combinationSet(set1, 3));
	console.log(result);
	assertEquals(result.length, 20);
});
Deno.test("1 Combination Simple 6", { permissions: "none" }, () => {
	const result = Array.from(combinationSet(set1, 6));
	console.log(result);
	assertEquals(result.length, 1);
});
Deno.test("1 Combination Simple 3+6", { permissions: "none" }, () => {
	const result = Array.from(combinationSet(set1, [3, 6]));
	console.log(result);
	assertEquals(result.length, 21);
});
Deno.test("1 Permutation AllowRepeat 3", { permissions: "none" }, () => {
	const result = Array.from(permutationSet(set1, {
		allowRepeat: true,
		size: 3
	}));
	console.log(result);
	assertEquals(result.length, 216);
});
Deno.test("1 Permutation NoRepeat 3", { permissions: "none" }, () => {
	const result = Array.from(permutationSet(set1, { size: 3 }));
	console.log(result);
	assertEquals(result.length, 120);
});
Deno.test("1 Permutation NoRepeat 6", { permissions: "none" }, () => {
	const result = Array.from(permutationSet(set1, { size: 6 }));
	console.log(result);
	assertEquals(result.length, 720);
});
Deno.test("1 Permutation Simple 3", { permissions: "none" }, () => {
	const result = Array.from(permutationSet(set1, 3));
	console.log(result);
	assertEquals(result.length, 120);
});
Deno.test("1 Permutation Simple 6", { permissions: "none" }, () => {
	const result = Array.from(permutationSet(set1, 6));
	console.log(result);
	assertEquals(result.length, 720);
});
Deno.test("1 Permutation Simple 3+6", { permissions: "none" }, () => {
	const result = Array.from(permutationSet(set1, [3, 6]));
	console.log(result);
	assertEquals(result.length, 840);
});
Deno.test("1 Permutation NotPossible 9", { permissions: "none" }, () => {
	assertThrows(() => {
		Array.from(permutationSet(set1, 9));
	});
});

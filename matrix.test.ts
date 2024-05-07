import { assertEquals } from "STD/assert/assert-equals";
import { combinationMatrix } from "./matrix.ts";
Deno.test("0 Map", { permissions: "none" }, () => {
	const result = Array.from(combinationMatrix(new Map()));
	console.log(result);
	assertEquals(result.length, 1);
});
Deno.test("0 Record", { permissions: "none" }, () => {
	const result = Array.from(combinationMatrix({}));
	console.log(result);
	assertEquals(result.length, 1);
});
Deno.test("3*3 Map", { permissions: "none" }, () => {
	const result = Array.from(combinationMatrix(new Map([
		["foo", [1, 2, 3]],
		["bar", [4, 5, 6]]
	])));
	console.log(result);
	assertEquals(result.length, 9);
});
Deno.test("3*3 Record", { permissions: "none" }, () => {
	const result = Array.from(combinationMatrix({
		foo: [1, 2, 3],
		bar: [4, 5, 6]
	}));
	console.log(result);
	assertEquals(result.length, 9);
});
Deno.test("9*9*9 Map", { permissions: "none" }, () => {
	const result = Array.from(combinationMatrix(new Map([
		["a", [1, 2, 3, 4, 5, 6, 7, 8, 9]],
		["b", [1, 2, 3, 4, 5, 6, 7, 8, 9]],
		["c", [1, 2, 3, 4, 5, 6, 7, 8, 9]]
	])));
	console.log(result);
	assertEquals(result.length, 729);
});
Deno.test("9*9*9 Record", { permissions: "none" }, () => {
	const result = Array.from(combinationMatrix({
		a: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		b: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		c: [1, 2, 3, 4, 5, 6, 7, 8, 9]
	}));
	console.log(result);
	assertEquals(result.length, 729);
});

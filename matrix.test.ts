import { assertEquals } from "STD/assert/assert_equals.ts";
import { combinationMatrix } from "./matrix.ts";
Deno.test("Matrix 1", { permissions: "none" }, () => {
	const matrix = {
		foo: [1, 2, 3],
		bar: [4, 5, 6]
	};
	const count = Object.values(matrix).map((value) => {
		return value.length;
	}).reduce((previous, current) => {
		return previous * current;
	});
	const result = Array.from(combinationMatrix(matrix));
	console.log(result);
	assertEquals(result.length, count);
});
Deno.test("Matrix 2", { permissions: "none" }, () => {
	const matrix = {
		a: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		b: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		c: [1, 2, 3, 4, 5, 6, 7, 8, 9]
	};
	const count = Object.values(matrix).map((value) => {
		return value.length;
	}).reduce((previous, current) => {
		return previous * current;
	});
	const result = Array.from(combinationMatrix(matrix));
	console.log(result);
	assertEquals(result.length, count);
});

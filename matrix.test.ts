import { assertEquals } from "TEST/assert_equals.ts";
import { combinationMatrix } from "./matrix.ts";
Deno.test("Combination 1", { permissions: "none" }, () => {
	const result = Array.from(combinationMatrix({ foo: [1, 2, 3], bar: [4, 5, 6] }));
	console.log(result);
	assertEquals(result.length, 9);
});

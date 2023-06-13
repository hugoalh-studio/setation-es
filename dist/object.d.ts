/**
 * @generator setationObject
 * @description List combinations from a object.
 * @template {unknown} V
 * @param {{ [x: string]: V | V[]; } | Map<string, V | V[]>} set Set.
 * @returns {Generator<{ [x: string]: V; }, void, unknown>} A combinations subset generator.
 */
declare function setationObject<V>(set: {
    [x: string]: V | V[];
} | Map<string, V | V[]>): Generator<{
    [x: string]: V;
}, void, unknown>;
export { setationObject as combinationMatrix };
//# sourceMappingURL=object.d.ts.map
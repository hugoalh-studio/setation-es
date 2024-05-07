# Setation (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh-studio/setation-es](https://img.shields.io/github/v/release/hugoalh-studio/setation-es?label=hugoalh-studio/setation-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh-studio/setation-es")](https://github.com/hugoalh-studio/setation-es)
[![JSR: @hugoalh/setation](https://img.shields.io/jsr/v/@hugoalh/setation?label=JSR%20@hugoalh/setation&labelColor=F7DF1E&logoColor=000000&style=flat "JSR: @hugoalh/setation")](https://jsr.io/@hugoalh/setation)
[![NPM: @hugoalh/setation](https://img.shields.io/npm/v/@hugoalh/setation?label=@hugoalh/setation&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/setation")](https://www.npmjs.com/package/@hugoalh/setation)

An ES (JavaScript & TypeScript) module to list permutations and combinations from a set.

## 🔰 Begin

### 🎯 Targets

|  | **Registry - JSR** | **Registry - NPM** | **Remote Import** |
|:--|:--|:--|:--|
| **[Bun](https://bun.sh/)** >= v1.1.0 | [✔️ `node_modules`](https://jsr.io/docs/npm-compatibility) | [✔️ Specifier `npm:`](https://bun.sh/docs/runtime/autoimport) | ❌ |
| **[Cloudflare Workers](https://workers.cloudflare.com/)** | [✔️ `node_modules`](https://jsr.io/docs/with/cloudflare-workers) | [✔️ `node_modules`](https://docs.npmjs.com/using-npm-packages-in-your-projects) | ❌ |
| **[Deno](https://deno.land/)** >= v1.42.0 | [✔️ Specifier `jsr:`](https://jsr.io/docs/with/deno) | [✔️ Specifier `npm:`](https://docs.deno.com/runtime/manual/node/npm_specifiers) | [✔️](https://docs.deno.com/runtime/manual/basics/modules/#remote-import) |
| **[NodeJS](https://nodejs.org/)** >= v16.13.0 | [✔️ `node_modules`](https://jsr.io/docs/with/node) | [✔️ `node_modules`](https://docs.npmjs.com/using-npm-packages-in-your-projects) | ❌ |

> **ℹ️ Note**
>
> It is possible to use this module in other methods/ways which not listed in here, however it is not officially supported.

### #️⃣ Registries Identifier

- **JSR:**
  ```
  @hugoalh/setation
  ```
- **NPM:**
  ```
  @hugoalh/setation
  ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to use this module with tag for immutability.

### #️⃣ Remote Import Paths

- **GitHub Raw:** (Require Tag)
  ```
  https://raw.githubusercontent.com/hugoalh-studio/setation-es/${Tag}/mod.ts
  ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module with the main path `mod.ts`, it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's file path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `export function _baz() {}`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - Although there have 3rd party services which provide enhanced, equal, or similar methods/ways to remote import the module, beware these services maybe inject unrelated elements and thus affect the security.

### 🛡️ Permissions

*This module does not require any permission.*

## 🧩 APIs

- ```ts
  function combinationMatrix<V>(set: { [x: string]: V[]; }): Generator<{ [x: string]: V; }>;
  function combinationMatrix<K, V>(set: Map<K, V[]>): Generator<Map<K, V>>;
  ```
- ```ts
  function combinationSet<T>(set: T[] | Set<T>, options: SetationSetOptions = {}): Generator<T[]>;
  function combinationSet<T>(set: T[] | Set<T>, size: Required<SetationSetOptions>["size"]): Generator<T[]>;
  ```
- ```ts
  function permutationSet<T>(set: T[] | Set<T>, options: SetationSetOptions = {}): Generator<T[]>;
  function permutationSet<T>(set: T[] | Set<T>, size: Required<SetationSetOptions>["size"]): Generator<T[]>;
  ```
- ```ts
  interface SetationSetOptions {
    /**
     * Whether to allow the same element repeat appear in the same subset.
     * 
     * When this value is `true`, require option `size`, or options `sizeMaximum` and `sizeMinimum`.
     * @default false
     */
    allowRepeat?: boolean;
    /**
     * Fixed size of the subset.
     * 
     * Conflict with options `sizeMaximum` and `sizeMinimum`.
     * @default undefined
     */
    size?: number | number[];
    /**
     * Maximum size of the subset.
     * 
     * Require option `sizeMinimum`.
     *
     * Conflict with option `size`.
     * @default undefined
     */
    sizeMaximum?: number;
    /**
     * Minimum size of the subset.
     * 
     * Require option `sizeMaximum`.
     *
     * Conflict with option `size`.
     * @default undefined
     */
    sizeMinimum?: number;
  }
  ```

> **ℹ️ Note**
>
> For the prettier documentation, can visit via:
>
> - [Deno CLI `deno doc`](https://deno.land/manual/tools/documentation_generator)
> - [JSR](https://jsr.io/@hugoalh/setation)


## ✍️ Examples

- ```js
  const item = ["a", "b", "c", "d", "e", "f"];

  Array.from(combinationSet(item, 3));
  /*=>
  [
    [ "a", "b", "c" ], [ "a", "b", "d" ],
    [ "a", "b", "e" ], [ "a", "b", "f" ],
    [ "a", "c", "d" ], [ "a", "c", "e" ],
    [ "a", "c", "f" ], [ "a", "d", "e" ],
    [ "a", "d", "f" ], [ "a", "e", "f" ],
    [ "b", "c", "d" ], [ "b", "c", "e" ],
    [ "b", "c", "f" ], [ "b", "d", "e" ],
    [ "b", "d", "f" ], [ "b", "e", "f" ],
    [ "c", "d", "e" ], [ "c", "d", "f" ],
    [ "c", "e", "f" ], [ "d", "e", "f" ]
  ]
  */

  Array.from(permutationSet(item, 3));
  /*=>
  [
    [ "a", "b", "c" ], [ "a", "b", "d" ],
    [ "a", "b", "e" ], [ "a", "b", "f" ],
    [ "a", "c", "b" ], [ "a", "c", "d" ],
    [ "a", "c", "e" ], [ "a", "c", "f" ],
    [ "a", "d", "b" ], [ "a", "d", "c" ],
    [ "a", "d", "e" ], [ "a", "d", "f" ],
    [ "a", "e", "b" ], [ "a", "e", "c" ],
    [ "a", "e", "d" ], [ "a", "e", "f" ],
    [ "a", "f", "b" ], [ "a", "f", "c" ],
    [ "a", "f", "d" ], [ "a", "f", "e" ],
    [ "b", "a", "c" ], [ "b", "a", "d" ],
    [ "b", "a", "e" ], [ "b", "a", "f" ],
    [ "b", "c", "a" ], [ "b", "c", "d" ],
    [ "b", "c", "e" ], [ "b", "c", "f" ],
    [ "b", "d", "a" ], [ "b", "d", "c" ],
    [ "b", "d", "e" ], [ "b", "d", "f" ],
    [ "b", "e", "a" ], [ "b", "e", "c" ],
    [ "b", "e", "d" ], [ "b", "e", "f" ],
    [ "b", "f", "a" ], [ "b", "f", "c" ],
    [ "b", "f", "d" ], [ "b", "f", "e" ],
    ... +80
  ]
  */
  ```
- ```js
  Array.from(combinationMatrix({ foo: [1, 2, 3], bar: [4, 5, 6] }));
  /*=>
  [
    { foo: 1, bar: 4 }, { foo: 1, bar: 5 },
    { foo: 1, bar: 6 }, { foo: 2, bar: 4 },
    { foo: 2, bar: 5 }, { foo: 2, bar: 6 },
    { foo: 3, bar: 4 }, { foo: 3, bar: 5 },
    { foo: 3, bar: 6 }
  ]
  */
  ```

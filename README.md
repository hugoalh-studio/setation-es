# Setation (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh-studio/setation-es](https://img.shields.io/github/v/release/hugoalh-studio/setation-es?label=hugoalh-studio/setation-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh-studio/setation-es")](https://github.com/hugoalh-studio/setation-es)
[![JSR: @hugoalh/setation](https://img.shields.io/jsr/v/@hugoalh/setation?label=JSR%20@hugoalh/setation&labelColor=F7DF1E&logoColor=000000&style=flat "JSR: @hugoalh/setation")](https://jsr.io/@hugoalh/setation)
[![NPM: @hugoalh/setation](https://img.shields.io/npm/v/@hugoalh/setation?label=@hugoalh/setation&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/setation")](https://www.npmjs.com/package/@hugoalh/setation)

An ES (JavaScript & TypeScript) module to list permutations and combinations from a set.

## 🎯 Target

- Bun ^ v1.0.0
- Cloudflare Workers
- Deno >= v1.34.0 / >= v1.41.1 (For JSR Only)
  > **🛡️ Require Permission**
  >
  > *N/A*
- NodeJS >= v16.13.0

## 🔰 Usage

### Via JSR With `node_modules`

> **🎯 Supported Target**
>
> - Bun
> - Cloudflare Workers
> - NodeJS

1. Install via:
    - Bun
      ```sh
      bunx jsr add @hugoalh/setation[@${Tag}]
      ```
    - NPM
      ```sh
      npx jsr add @hugoalh/setation[@${Tag}]
      ```
    - PNPM
      ```sh
      pnpm dlx jsr add @hugoalh/setation[@${Tag}]
      ```
    - Yarn
      ```sh
      yarn dlx jsr add @hugoalh/setation[@${Tag}]
      ```
2. Import at the script:
    ```ts
    import ... from "@hugoalh/setation";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via JSR With Specifier

> **🎯 Supported Target**
>
> - Deno

1. Import at the script:
    ```ts
    import ... from "jsr:@hugoalh/setation[@${Tag}]";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via NPM With `node_modules`

> **🎯 Supported Target**
>
> - Cloudflare Workers
> - NodeJS

1. Install via:
    - NPM
      ```sh
      npm install @hugoalh/setation[@${Tag}]
      ```
    - PNPM
      ```sh
      pnpm add @hugoalh/setation[@${Tag}]
      ```
    - Yarn
      ```sh
      yarn add @hugoalh/setation[@${Tag}]
      ```
2. Import at the script:
    ```ts
    import ... from "@hugoalh/setation";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via NPM With Specifier

> **🎯 Supported Target**
>
> - Bun
> - Deno

1. Import at the script:
    ```ts
    import ... from "npm:@hugoalh/setation[@${Tag}]";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via Remote Import

> **🎯 Supported Target**
>
> - Deno

1. Import at the script:
    ```ts
    /* Via GitHub Raw (Require Tag) */
    import ... from "https://raw.githubusercontent.com/hugoalh-studio/setation-es/${Tag}/mod.ts";
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

## 🧩 API

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


## ✍️ Example

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

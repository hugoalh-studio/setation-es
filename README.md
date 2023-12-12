# Setation (NodeJS)

[⚖️ MIT](./LICENSE.md)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/setation-nodejs?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor Grade")](https://www.codefactor.io/repository/github/hugoalh-studio/setation-nodejs)

|  | **Release - Latest** | **Release - Pre** |
|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh-studio/setation-nodejs) | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/setation-nodejs?sort=semver&label=&style=flat-square "GitHub Latest Release Version") (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/setation-nodejs?label=&style=flat-square "GitHub Latest Release Date")) | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/setation-nodejs?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/setation-nodejs?label=&style=flat-square "GitHub Latest Pre-Release Date")) |
| [![NPM](https://img.shields.io/badge/NPM-CB3837?logo=npm&logoColor=ffffff&style=flat-square "NPM")](https://www.npmjs.com/package/@hugoalh/setation) | ![NPM Latest Release Version](https://img.shields.io/npm/v/@hugoalh/setation/latest?label=&style=flat-square "NPM Latest Release Version") | ![NPM Latest Pre-Release Version](https://img.shields.io/npm/v/@hugoalh/setation/pre?label=&style=flat-square "NPM Latest Pre-Release Version") |

A NodeJS module to list permutations and combinations from a set.

## 🔰 Begin

### Bun

> **🧪 Experimental:** Bun is still under development.

- **Target Version:** ^ v1.0.0, &:
  - TypeScript >= v5.1.0 *\[Development\]*
- **Require Permission:** *N/A*
- **Domain/Registry:**
  - [NPM](https://www.npmjs.com/package/@hugoalh/setation)
    ```sh
    bun add @hugoalh/setation[@<Tag>]
    ```
    ```js
    import ... from "@hugoalh/setation[@<Tag>]";
    ```

> **ℹ️ Notice:** It is also able to import part of the module with sub path if available, see [file `package.json`](./package.json) property `exports` for available sub paths.

### NodeJS

- **Target Version:** ^ v12.20.0 \|\| ^ v14.15.0 \|\| >= v16.13.0, &:
  - TypeScript >= v5.1.0 *\[Development\]*
- **Require Permission:** *N/A*
- **Domain/Registry:**
  - [NPM](https://www.npmjs.com/package/@hugoalh/setation)
    ```sh
    npm install @hugoalh/setation[@<Tag>]
    ```
    ```js
    import ... from "@hugoalh/setation";
    ```

> **ℹ️ Notice:** It is also able to import part of the module with sub path if available, see [file `package.json`](./package.json) property `exports` for available sub paths.

## 🧩 API

- ```ts
  function* combination<T>(set: T[] | Set<T>, size: number | number[]): Generator<T[], void, unknown>;
  function* combination<T>(set: T[] | Set<T>, sizeMinimum: number, sizeMaximum: number): Generator<T[], void, unknown>;
  function* combination<T>(set: T[] | Set<T>, options: CombinationOptions = {}): Generator<T[], void, unknown>;
  ```
- ```ts
  /* >= v1.2.0 */
  function* combinationMatrix<V>(set: { [x: string]: V | V[]; } | Map<string, V | V[]>): Generator<{ [x: string]: V; }, void, unknown>;
  ```
- ```ts
  function* permutation<T>(set: T[] | Set<T>, size: number | number[]): Generator<T[], void, unknown>;
  function* permutation<T>(set: T[] | Set<T>, sizeMinimum: number, sizeMaximum: number): Generator<T[], void, unknown>;
  function* permutation<T>(set: T[] | Set<T>, options: PermutationOptions = {}): Generator<T[], void, unknown>;
  ```
- ```ts
  interface CombinationOptions {
    allowRepeat: boolean = false;// Whether to allow the same element repeat appear in the same subset.
    size?: number | number[];// Size of the subset.
    sizeMaximum?: number;// Maximum size of the subset.
    sizeMinimum?: number;// Minimum size of the subset.
  }
  ```
- ```ts
  interface PermutationOptions {
    allowRepeat: boolean = false;// Whether to allow the same element repeat appear in the same subset.
    size?: number | number[];// Size of the subset.
    sizeMaximum?: number;// Maximum size of the subset.
    sizeMinimum?: number;// Minimum size of the subset.
  }
  ```

> **ℹ️ Notice:** Documentation is included inside the script file.

## ✍️ Example

- ```js
  import { combination, permutation } from "@hugoalh/setation";
  const item = ["a", "b", "c", "d", "e", "f"];

  Array.from(combination(item, 3));
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

  Array.from(permutation(item, 3));
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
  import { combinationMatrix } from "@hugoalh/setation";

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

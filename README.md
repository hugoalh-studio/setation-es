# Setation (NodeJS)

[⚖️ MIT](./LICENSE.md)

|  | **Heat** | **Release - Latest** | **Release - Pre** |
|:-:|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh-studio/setation-nodejs) | [![GitHub Stars](https://img.shields.io/github/stars/hugoalh-studio/setation-nodejs?label=&logoColor=ffffff&style=flat-square "GitHub Stars")](https://github.com/hugoalh-studio/setation-nodejs/stargazers) \| ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh-studio/setation-nodejs/total?label=&style=flat-square "GitHub Total Downloads") | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/setation-nodejs?sort=semver&label=&style=flat-square "GitHub Latest Release Version") (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/setation-nodejs?label=&style=flat-square "GitHub Latest Release Date")) | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/setation-nodejs?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/setation-nodejs?label=&style=flat-square "GitHub Latest Pre-Release Date")) |
| [![NPM](https://img.shields.io/badge/NPM-CB3837?logo=npm&logoColor=ffffff&style=flat-square "NPM")](https://www.npmjs.com/package/@hugoalh/setation) | ![NPM Total Downloads](https://img.shields.io/npm/dt/@hugoalh/setation?label=&style=flat-square "NPM Total Downloads") | ![NPM Latest Release Version](https://img.shields.io/npm/v/@hugoalh/setation/latest?label=&style=flat-square "NPM Latest Release Version") | ![NPM Latest Pre-Release Version](https://img.shields.io/npm/v/@hugoalh/setation/pre?label=&style=flat-square "NPM Latest Pre-Release Version") |

A NodeJS module to list permutations and combinations from a set.

## 📓 Documentation

### Getting Started

- NodeJS ^ v12.20.0 || ^ v14.15.0 || >= v16.13.0

```sh
npm install @hugoalh/setation
```

```js
/* Either */
import { ... } from "@hugoalh/setation";// Named Import
import * as setation from "@hugoalh/setation";// Namespace Import
```

### API

#### Generator Function

- ```ts
  combination<T>(set: T[] | Set<T>, size: number | number[]): Generator<T[], void, unknown>;
  combination<T>(set: T[] | Set<T>, sizeMinimum: number, sizeMaximum: number): Generator<T[], void, unknown>;
  combination<T>(set: T[] | Set<T>, options: CombinationOptions = {}): Generator<T[], void, unknown>;
  ```
- ```ts
  /* >= v1.2.0 */
  combinationMatrix<V>(set: { [x: string]: V | V[]; } | Map<string, V | V[]>): Generator<{ [x: string]: V; }, void, unknown>;
  ```
- ```ts
  permutation<T>(set: T[] | Set<T>, size: number | number[]): Generator<T[], void, unknown>;
  permutation<T>(set: T[] | Set<T>, sizeMinimum: number, sizeMaximum: number): Generator<T[], void, unknown>;
  permutation<T>(set: T[] | Set<T>, options: PermutationOptions = {}): Generator<T[], void, unknown>;
  ```

#### Interface / Type

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

### Example

- ```js
  let item = ["a", "b", "c", "d", "e", "f"];
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

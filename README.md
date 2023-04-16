# Setation (NodeJS)

![License](https://img.shields.io/static/v1?label=License&message=MIT&style=flat-square "License")
[![GitHub Repository](https://img.shields.io/badge/Repository-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub Repository")](https://github.com/hugoalh-studio/setation-nodejs)
[![GitHub Stars](https://img.shields.io/github/stars/hugoalh-studio/setation-nodejs?label=Stars&logo=github&logoColor=ffffff&style=flat-square "GitHub Stars")](https://github.com/hugoalh-studio/setation-nodejs/stargazers)
[![GitHub Contributors](https://img.shields.io/github/contributors/hugoalh-studio/setation-nodejs?label=Contributors&logo=github&logoColor=ffffff&style=flat-square "GitHub Contributors")](https://github.com/hugoalh-studio/setation-nodejs/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues-raw/hugoalh-studio/setation-nodejs?label=Issues&logo=github&logoColor=ffffff&style=flat-square "GitHub Issues")](https://github.com/hugoalh-studio/setation-nodejs/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/hugoalh-studio/setation-nodejs?label=Pull%20Requests&logo=github&logoColor=ffffff&style=flat-square "GitHub Pull Requests")](https://github.com/hugoalh-studio/setation-nodejs/pulls)
[![GitHub Discussions](https://img.shields.io/github/discussions/hugoalh-studio/setation-nodejs?label=Discussions&logo=github&logoColor=ffffff&style=flat-square "GitHub Discussions")](https://github.com/hugoalh-studio/setation-nodejs/discussions)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/setation-nodejs?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor Grade")](https://www.codefactor.io/repository/github/hugoalh-studio/setation-nodejs)

| **Releases** | **Latest** (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/setation-nodejs?label=&style=flat-square "GitHub Latest Release Date")) | **Pre** (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/setation-nodejs?label=&style=flat-square "GitHub Latest Pre-Release Date")) |
|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh-studio/setation-nodejs/releases) ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh-studio/setation-nodejs/total?label=&style=flat-square "GitHub Total Downloads") | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/setation-nodejs?sort=semver&label=&style=flat-square "GitHub Latest Release Version") | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/setation-nodejs?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") |
| [![NPM](https://img.shields.io/badge/NPM-CB3837?logo=npm&logoColor=ffffff&style=flat-square "NPM")](https://www.npmjs.com/package/@hugoalh/setation) ![NPM Total Downloads](https://img.shields.io/npm/dt/@hugoalh/setation?label=&style=flat-square "NPM Total Downloads") | ![NPM Latest Release Version](https://img.shields.io/npm/v/@hugoalh/setation/latest?label=&style=flat-square "NPM Latest Release Version") | ![NPM Latest Pre-Release Version](https://img.shields.io/npm/v/@hugoalh/setation/pre?label=&style=flat-square "NPM Latest Pre-Release Version") |

## 📝 Description

A NodeJS module to list permutations and combinations from a set.

## 📚 Documentation

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
  permutation<T>(set: T[] | Set<T>, size: number | number[]): Generator<T[], void, unknown>;
  permutation<T>(set: T[] | Set<T>, sizeMinimum: number, sizeMaximum: number): Generator<T[], void, unknown>;
  permutation<T>(set: T[] | Set<T>, options: PermutationOptions = {}): Generator<T[], void, unknown>;
  ```

### Example

```js
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
  [ "c", "a", "b" ], [ "c", "a", "d" ],
  [ "c", "a", "e" ], [ "c", "a", "f" ],
  [ "c", "b", "a" ], [ "c", "b", "d" ],
  [ "c", "b", "e" ], [ "c", "b", "f" ],
  [ "c", "d", "a" ], [ "c", "d", "b" ],
  [ "c", "d", "e" ], [ "c", "d", "f" ],
  [ "c", "e", "a" ], [ "c", "e", "b" ],
  [ "c", "e", "d" ], [ "c", "e", "f" ],
  [ "c", "f", "a" ], [ "c", "f", "b" ],
  [ "c", "f", "d" ], [ "c", "f", "e" ],
  [ "d", "a", "b" ], [ "d", "a", "c" ],
  [ "d", "a", "e" ], [ "d", "a", "f" ],
  [ "d", "b", "a" ], [ "d", "b", "c" ],
  [ "d", "b", "e" ], [ "d", "b", "f" ],
  [ "d", "c", "a" ], [ "d", "c", "b" ],
  [ "d", "c", "e" ], [ "d", "c", "f" ],
  [ "d", "e", "a" ], [ "d", "e", "b" ],
  [ "d", "e", "c" ], [ "d", "e", "f" ],
  [ "d", "f", "a" ], [ "d", "f", "b" ],
  [ "d", "f", "c" ], [ "d", "f", "e" ],
  [ "e", "a", "b" ], [ "e", "a", "c" ],
  [ "e", "a", "d" ], [ "e", "a", "f" ],
  [ "e", "b", "a" ], [ "e", "b", "c" ],
  [ "e", "b", "d" ], [ "e", "b", "f" ],
  [ "e", "c", "a" ], [ "e", "c", "b" ],
  [ "e", "c", "d" ], [ "e", "c", "f" ],
  [ "e", "d", "a" ], [ "e", "d", "b" ],
  [ "e", "d", "c" ], [ "e", "d", "f" ],
  [ "e", "f", "a" ], [ "e", "f", "b" ],
  [ "e", "f", "c" ], [ "e", "f", "d" ],
  ... +20
]
*/
```

# Setation (NodeJS)

[`Setation.NodeJS`](https://github.com/hugoalh-studio/setation-nodejs)

![License](https://img.shields.io/static/v1?label=License&message=MIT&style=flat-square "License")
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

#### Install

- NodeJS ^ v12.20.0 || ^ v14.15.0 || >= v16.13.0

```sh
npm install @hugoalh/setation
```

#### Use

```js
/* Either */
import { ... } from "@hugoalh/setation";// Named Import
import * as setation from "@hugoalh/setation";// Namespace Import
```

### API

#### Function

- ```ts
  combination<T>(set: T[] | Set<T>, select: number = Infinity): T[][];
  ```
- ```ts
  permutation<T>(set: T[] | Set<T>, select: number = Infinity): T[][];
  ```

### Example

```js
combination(["a", "b", "c", "d", "e"], 2);
/*=>
[
  [ "a", "b" ],
  [ "a", "c" ],
  [ "a", "d" ],
  [ "a", "e" ],
  [ "b", "c" ],
  [ "b", "d" ],
  [ "b", "e" ],
  [ "c", "d" ],
  [ "c", "e" ],
  [ "d", "e" ]
]
*/

permutation(["a", "b", "c", "d", "e"], 3);
/*=>
[
  [ "a", "b", "c" ],
  [ "a", "b", "d" ],
  [ "a", "b", "e" ],
  [ "a", "c", "b" ],
  [ "a", "c", "d" ],
  [ "a", "c", "e" ],
  [ "a", "d", "b" ],
  [ "a", "d", "c" ],
  [ "a", "d", "e" ],
  [ "a", "e", "b" ],
  [ "a", "e", "c" ],
  [ "a", "e", "d" ],
  [ "b", "a", "c" ],
  [ "b", "a", "d" ],
  [ "b", "a", "e" ],
  [ "b", "c", "a" ],
  [ "b", "c", "d" ],
  [ "b", "c", "e" ],
  [ "b", "d", "a" ],
  [ "b", "d", "c" ],
  [ "b", "d", "e" ],
  [ "b", "e", "a" ],
  [ "b", "e", "c" ],
  [ "b", "e", "d" ],
  [ "c", "a", "b" ],
  [ "c", "a", "d" ],
  [ "c", "a", "e" ],
  [ "c", "b", "a" ],
  [ "c", "b", "d" ],
  [ "c", "b", "e" ],
  [ "c", "d", "a" ],
  [ "c", "d", "b" ],
  [ "c", "d", "e" ],
  [ "c", "e", "a" ],
  [ "c", "e", "b" ],
  [ "c", "e", "d" ],
  [ "d", "a", "b" ],
  [ "d", "a", "c" ],
  [ "d", "a", "e" ],
  [ "d", "b", "a" ],
  [ "d", "b", "c" ],
  [ "d", "b", "e" ],
  [ "d", "c", "a" ],
  [ "d", "c", "b" ],
  [ "d", "c", "e" ],
  [ "d", "e", "a" ],
  [ "d", "e", "b" ],
  [ "d", "e", "c" ],
  [ "e", "a", "b" ],
  [ "e", "a", "c" ],
  [ "e", "a", "d" ],
  [ "e", "b", "a" ],
  [ "e", "b", "c" ],
  [ "e", "b", "d" ],
  [ "e", "c", "a" ],
  [ "e", "c", "b" ],
  [ "e", "c", "d" ],
  [ "e", "d", "a" ],
  [ "e", "d", "b" ],
  [ "e", "d", "c" ]
]
*/
```

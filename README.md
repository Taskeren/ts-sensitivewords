# TS-SensitiveWords

[![](https://img.shields.io/npm/v/ts-sensitivewords)](https://www.npmjs.com/package/ts-sensitivewords)

TypeScript rewrite of [alex-my/js-sensitivewords](https://github.com/alex-my/js-sensitivewords).

A small TypeScript library for sensitive word detection using a simple DFA (trie) implementation. It provides adding words, detecting presence, finding matches and masking sensitive words for quick integration into applications.

## Features

- Add sensitive words: `addWords(...words: string[])`
- Check if content contains any sensitive word: `contains(content: string): boolean`
- Check match length from a position: `check(content: string, startIndex?: number): number`
- Find all matches in content: `find(content: string, startIndex?: number): string[]`
- Mask detected sensitive words: `mask(content: string, mask?: string): string`

## Installation

```bash
npm install ts-sensitivewords
```

## Usage

1) Use the default exported instance:

```ts
import sw from 'ts-sensitivewords'

sw.addWords('sensitive1', 'sensitive2')
console.log(sw.contains('This text contains sensitive1')) // true
console.log(sw.mask('This text contains sensitive1')) // "This text contains **********"
```

2) Create an independent instance:

```ts
import { SensitiveWords } from 'ts-sensitivewords' // or import { SensitiveWords } from './src'

const s = new SensitiveWords()
s.addWords('foo', 'bar')
console.log(s.find('foo and bar and foo')) // ['foo','bar','foo']
```

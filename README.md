[![npm version](https://img.shields.io/npm/v/@gnosis.pm/dex-js.svg?style=flat)](https://npmjs.org/package/@gnosis.pm/dex-js 'View this project on npm')
&nbsp;
[![Build Status](https://travis-ci.org/gnosis/dex-js.svg?branch=develop)](https://travis-ci.org/gnosis/dex-js)
&nbsp;
[![Coverage Status](https://coveralls.io/repos/github/gnosis/dex-js/badge.svg?branch=master)](https://coveralls.io/github/gnosis/dex-js?branch=master)

Develop:
&nbsp;
[![Build Status](https://travis-ci.org/gnosis/dex-js.svg?branch=develop)](https://travis-ci.org/gnosis/dex-js)
&nbsp;
[![Coverage Status](https://coveralls.io/repos/github/gnosis/dex-js/badge.svg?branch=develop)](https://coveralls.io/github/gnosis/dex-js?branch=develop)

# Gnosis Protocol JS

Gnosis Protocol JS it's library, with typescript support for [Gnosis Protocol](https://docs.gnosis.io/protocol).

Gnosis Protocol introduces a new, fully decentralized exchange mechanism for ERC20 tokens with the following
properties:

- Batch auctions
- Multidimensional order books with ring trades
- Uniform clearing prices in every batch

This library provides:

- Typescrypt version of the contracts of Gnosis Protocol
- Some handy utils and constants

## Usage

```bash
# Using yarn
yarn add @gnosis.pm/dex-js --save

#Alternatively
npm install @gnosis.pm/dex-js --save
```

Import the contract:

```js
import { BatchExchangeContract } from ' @gnosis.pm/dex-js'

// Instanciate the smart contract
const web3 = new Web3()
const batchExchangeContract = new BatchExchangeContract({ web3 })

// Alternativelly provide the address
const batchExchangeContract = new BatchExchangeContract({ web3, address: '0x89593E017D4A88c60347257DAfB95384a422da09' })
```

# Issues

If you find any issue, or you want to request a feature use [https://github.com/gnosis/dex-js/issues]()

[Pull requests](https://github.com/gnosis/dex-js/pulls) are welcomed and are the best way to suggest new features.

# Collaborate

## Build

```bash
# Install dependencies
yarn install

# Build
yarn build

# Build and watch (useful when using "npm link")
yarn build:watch
```

## Run test

```bash
# Install dependencies
yarn install

# Run
yarn test
```

'use strict'

const fs = require('fs')
const path = require('path')

const CONTRACTS = ['BatchExchange']
const { abi } = require('@gnosis.pm/dex-contracts/build/contracts/BatchExchange.json')
const ABI_DIR = path.join(__dirname, '../contracts/abi')

if (!fs.existsSync(ABI_DIR)) {
  fs.mkdirSync(ABI_DIR)
}
for (const contractName of CONTRACTS) {
  const file = ABI_DIR + `/${contractName}.json`
  console.log('Write ABI: ' + file)
  fs.writeFileSync(file, JSON.stringify(abi, null, 2))
}

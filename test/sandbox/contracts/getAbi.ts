import Logger from 'helpers/Logger'

import { batchExchangeAbi } from 'contracts'
require('dotenv').config()

/**
 *  SANDBOX: Get ABI from the contracts
 *  RUN:     yarn sandbox test/sandbox/contracts/getAbi.ts
 */
const log = new Logger('sandbox:contracts:getAbi')

async function exec (): Promise<void> {
  console.log('BatchExchange has %d functions', batchExchangeAbi.length)
  batchExchangeAbi
    .filter(({ type }) => type === 'function')
    .forEach(({ name }) => {
      console.log('- ' + name)
    })
}

exec().catch(log.errorHandler)

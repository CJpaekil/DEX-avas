import Logger from 'helpers/Logger'
import { BatchExchangeContract } from 'contracts'
import { batchExchangeContract } from '../../helpers/contracts'

require('dotenv').config()

/**
 *  SANDBOX: Prints events topics
 *  RUN:     yarn sandbox test/sandbox/contracts/getTrades.ts
 */
const log = new Logger('sandbox:contracts/getTrades')

async function exec (): Promise<void> {
  log.info('Get new trades for contract: %s', batchExchangeContract.options.address)
  ;(batchExchangeContract as BatchExchangeContract).events
    .Trade({ fromBlock: 0, toBlock: 'latest' })
    .on('connected', subscriptionId => log.info('Connected with subscription: %s', subscriptionId))
    .on('data', trade => {
      log.info('New Trade: %o', trade)
    })
    .on('changed', trade => {
      log.info('Trade changed: %o', trade)
    })
    .on('error', log.errorHandler)
}

exec().catch(log.errorHandler)

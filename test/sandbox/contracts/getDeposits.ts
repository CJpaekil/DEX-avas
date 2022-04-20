import Logger from 'helpers/Logger'
import { BatchExchangeContract } from 'contracts'
import { batchExchangeContract } from '../../helpers/contracts'

require('dotenv').config()

/**
 *  SANDBOX: Prints events topics
 *  RUN:     yarn sandbox test/sandbox/contracts/getDeposits.ts
 */
const log = new Logger('sandbox:contracts/getDeposits')

async function exec(): Promise<void> {
  log.info('Get new deposits for contract: %s', batchExchangeContract.options.address)
  ;(batchExchangeContract as BatchExchangeContract).events
    .Deposit({ fromBlock: 0, toBlock: 'latest' })
    .on('connected', subscriptionId => log.info('Connected with subscription: %s', subscriptionId))
    .on('data', deposit => {
      log.info('New deposit: %o', deposit)
    })
    .on('changed', deposit => {
      log.info('Deposit changed: %o', deposit)
    })
    .on('error', log.errorHandler)
}

exec().catch(log.errorHandler)

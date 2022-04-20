import Logger from 'helpers/Logger'
import { BatchExchangeContract } from 'contracts'
import { batchExchangeContract } from '../../helpers/contracts'

require('dotenv').config()

/**
 *  SANDBOX: Prints events topics
 *  RUN:     yarn sandbox test/sandbox/contracts/getOrderPlacements.ts
 */
const log = new Logger('sandbox:contracts/getOrderPlacements')

async function exec (): Promise<void> {
  log.info('Get new order placements for contract: %s', batchExchangeContract.options.address)
  ;(batchExchangeContract as BatchExchangeContract).events
    .OrderPlacement({ fromBlock: 0, toBlock: 'latest' })
    .on('connected', subscriptionId => log.info('Connected with subscription: %s', subscriptionId))
    .on('data', orderPlacement => {
      log.info('New order placement: %o', orderPlacement)
    })
    .on('changed', orderPlacement => {
      log.info('Order placement: %o', orderPlacement)
    })
    .on('error', log.errorHandler)
}

exec().catch(log.errorHandler)

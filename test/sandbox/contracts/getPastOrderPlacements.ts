import Logger from 'helpers/Logger'
import { batchExchangeContract } from '../../helpers/contracts'

require('dotenv').config()

/**
 *  SANDBOX: Prints events topics
 *  RUN:     yarn sandbox test/sandbox/contracts/getPastOrderPlacements.ts
 */
const log = new Logger('sandbox:contracts/getPastOrderPlacements')

async function exec (): Promise<void> {
  log.info('Get past order placements for contract: %s', batchExchangeContract.options.address)
  const events = await batchExchangeContract.getPastEvents('OrderPlacement', { fromBlock: 0, toBlock: 'latest' })

  log.info('Found %d order placements', events.length)
  events.forEach(orderPlacementEvent => {
    const { sellToken, buyToken, priceNumerator, priceDenominator, validFrom, validUntil } = orderPlacementEvent.returnValues
    log.info(
      'New order\n\tSell Token: %s\n\tBuy Token: %s\n\tNumerator: %s\n\tDenominator: %s\n\tValid From: %s\n\tValid until: %s\n\tTransaction: %s',
      sellToken, buyToken, priceNumerator, priceDenominator, validFrom, validUntil,
      orderPlacementEvent.transactionHash,
    )
  })
}

exec().catch(log.errorHandler)

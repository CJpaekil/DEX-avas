import Logger from 'helpers/Logger'
import { batchExchangeContract } from '../../helpers/contracts'

require('dotenv').config()

/**
 *  SANDBOX: Prints events topics
 *  RUN:     yarn sandbox test/sandbox/contracts/getPastDeposits.ts
 */
const log = new Logger('sandbox:contracts/getPastDeposits')

async function exec(): Promise<void> {
  log.info('Get past deposits for contract: %s', batchExchangeContract.options.address)
  const events = await batchExchangeContract.getPastEvents('Deposit', { fromBlock: 0, toBlock: 'latest' })

  log.info('Found %d deposits', events.length)
  events.forEach(depositEvent => {
    const { user, token, amount, stateIndex } = depositEvent.returnValues
    log.info(
      'New Deposit of user %s\n\tAmount: %s\n\tToken: %s\n\tState index: %s\n\tTransaction: %s',
      user,
      amount,
      token,
      stateIndex,
      depositEvent.transactionHash,
    )
  })
}

exec().catch(log.errorHandler)

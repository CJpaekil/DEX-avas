import Logger from 'helpers/Logger'
import { AbiItem } from 'web3-utils'
import { web3 } from '../../helpers/web3'

require('dotenv').config()

/**
 *  SANDBOX: Prints events topics
 *  RUN:     yarn sandbox test/sandbox/contracts/printEventTopics.ts
 */
const log = new Logger('sandbox:contracts/printEventTopics')

async function exec(): Promise<void> {
  const abi = require('contracts/abi/BatchExchange.json')
  const events = abi.filter((def: AbiItem) => def.type === 'event')

  log.info('Found %d events:', events.length)
  events.forEach((def: AbiItem) => {
    log.info('  - %s: ', def.name, web3.eth.abi.encodeEventSignature(def))
  })
}

exec().catch(log.errorHandler)

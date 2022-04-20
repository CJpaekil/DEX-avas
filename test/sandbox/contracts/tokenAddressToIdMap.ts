import Logger from 'helpers/Logger'
import { tokenList } from 'index'
import { batchExchangeContract } from '../../helpers/contracts'

require('dotenv').config()

/**
 *  SANDBOX: Get token id from token addresses
 *  RUN:     yarn sandbox test/sandbox/contracts/tokenAddressToIdMap.ts
 */
const log = new Logger('sandbox:contracts/tokenAddressToIdMap')

async function exec(): Promise<void> {
  const networkId = 4
  log.info('Get token address for network id: %d', networkId)
  const getAllTokenIds = tokenList.map(async token => {
    const { symbol, name, addressByNetwork } = token
    const tokenAddress = addressByNetwork[networkId]
    const tokenId = await batchExchangeContract.methods.tokenAddressToIdMap(tokenAddress).call()
    log.info(`${name} (${symbol}): ${tokenAddress}  ---->  ${tokenId}`)
  })

  await Promise.all(getAllTokenIds)
}

exec().catch(log.errorHandler)

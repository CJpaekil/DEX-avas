import BigNumber from 'bignumber.js'
import Logger from 'helpers/Logger'
import { batchExchangeContract } from '../../helpers/contracts'
import { toPlaceValidFromOrdersParams } from '../../../src/utils/orders'

require('dotenv').config()

// Rinkeby
// DHT test token: 0xcae75da51ead2c6bcb2628e0bdbeec9fecbef8a4
const sellToken = 30
const sellTokenDecimals = 18
// USDC
const buyToken = 4
const buyTokenDecimals = 6

// // MAINNET
// // DHT real token: 0xca1207647Ff814039530D7d35df0e1Dd2e91Fa84
// const sellToken = 148
// const sellTokenDecimals = 18
// // USDC
// const buyToken = 4
// const buyTokenDecimals = 6

// Common
const validFrom = 5334456
const validUntil = 5334744

const ORDERS: [string, string][] = [
  ['100000', '25000'],
  ['150000', '75000'],
  ['500000', '350000'],
  ['700000', '630000.'],
  ['700000', '770000.'],
  ['700000', '910000.'],
  ['600000', '900000.'],
  ['500000', '850000.'],
  ['300000', '570000.'],
  ['200000', '420000.'],
  ['100000', '232000.'],
  ['90000', '232200'],
  ['80000', '229600'],
  ['70000', '223300'],
  ['60000', '212400'],
  ['50000', '197000'],
  ['40000', '174800'],
  ['30000', '145800'],
  ['20000', '108000'],
  ['10000', '60000'],
]

/**
 *  SANDBOX: Print the encoded version for the functions
 *  RUN:     yarn sandbox test/sandbox/contracts/getSendTransactionData.ts
 */
const log = new Logger('sandbox:getSendTransactionData')

async function exec(): Promise<void> {
  log.info('Get data for sendOrders: %s', batchExchangeContract.options.address)

  const orders = ORDERS.map((order) => {
    const [sellAmount, buyAmount] = order
    return {
      sellToken,
      buyToken,
      sellAmount: new BigNumber(sellAmount).multipliedBy(10 ** sellTokenDecimals).toString(10),
      buyAmount: new BigNumber(buyAmount).multipliedBy(10 ** buyTokenDecimals).toString(10),
      validFrom,
      validUntil,
    }
  })

  log.info('orders', orders)

  // 399,999,999,994

  const { buyTokens, sellTokens, validFroms, validUntils, buyAmounts, sellAmounts } = toPlaceValidFromOrdersParams(orders)
  console.log({
    buyTokens, sellTokens, validFroms, validUntils, buyAmounts, sellAmounts,
  })

  const data = batchExchangeContract.methods.placeValidFromOrders(buyTokens, sellTokens, validFroms, validUntils, buyAmounts, sellAmounts).encodeABI()
  log.info(data)
}

exec().catch(log.errorHandler)

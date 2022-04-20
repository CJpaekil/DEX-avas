import BN from 'bn.js'
import BigNumber from 'bignumber.js'
import { UNLIMITED_ORDER_AMOUNT } from 'const'

export interface OrderParams<T extends string | BN> {
  sellToken: number,
  buyToken: number,
  sellAmount: T,
  buyAmount: T,
  validFrom: number,
  validUntil: number
}

export interface PlaceValidFromOrdersParams<T extends string | BN> {
  buyTokens: number[],
  sellTokens: number[],
  validFroms: number[],
  validUntils: number[],
  buyAmounts: T[],
  sellAmounts: T[],
}

function amountToString(amount: BN | BigNumber | string): string {
  if (typeof amount === 'string') {
    return amount
  } else {
    return amount.toString(10)
  }
}

/**
 * Checks whether values for given order qualifies it as an unlimited order.
 * See the corresponding contract code https://github.com/gnosis/dex-contracts/blob/master/contracts/BatchExchange.sol#L631
 *
 * Is this case, order of parameters do not matter.
 * If one of the given amounts == UNLIMITED_ORDER_AMOUNT, order is unlimited.
 *
 * @param amount1 Price numerator
 * @param amount2 Price denominator
 */
export function isOrderUnlimited(amount1: BN | BigNumber | string, amount2: BN | BigNumber | string): boolean {
  // Easier to always compare as string regardless of the type passed in
  const unlimitedAmount = amountToString(UNLIMITED_ORDER_AMOUNT)
  return amountToString(amount1) === unlimitedAmount || amountToString(amount2) === unlimitedAmount
}

export function toPlaceValidFromOrdersParams<T extends string | BN>(orders: OrderParams<T>[]): PlaceValidFromOrdersParams<T> {
  return orders.reduce<PlaceValidFromOrdersParams<T>>((acc, order) => {
    const { buyTokens, sellTokens, validFroms, validUntils, buyAmounts, sellAmounts } = acc
    const { buyToken, sellToken, validFrom, validUntil, buyAmount, sellAmount } = order
    buyTokens.push(buyToken)
    sellTokens.push(sellToken)
    validFroms.push(validFrom)
    validUntils.push(validUntil)
    buyAmounts.push(buyAmount)
    sellAmounts.push(sellAmount)
    return acc
  }, {
    buyTokens: [],
    sellTokens: [],
    validFroms: [],
    validUntils: [],
    buyAmounts: [],
    sellAmounts: [],
  })
}

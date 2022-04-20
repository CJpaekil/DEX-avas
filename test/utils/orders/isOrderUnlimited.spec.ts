import BN from 'bn.js'
import BigNumber from 'bignumber.js'

import { UNLIMITED_ORDER_AMOUNT, isOrderUnlimited } from '../../../src'

describe('Compare string values', () => {
  const unlimitedValue = UNLIMITED_ORDER_AMOUNT.toString()

  test('is unlimited', () => {
    expect(isOrderUnlimited(unlimitedValue, '0')).toBeTruthy()
  })
  test('is NOT unlimited', () => {
    expect(isOrderUnlimited('2', '0')).toBeFalsy()
  })
})

describe('Compare BN values', () => {
  const unlimitedValue = UNLIMITED_ORDER_AMOUNT

  test('is unlimited', () => {
    expect(isOrderUnlimited(unlimitedValue, new BN(1))).toBeTruthy()
  })
  test('is NOT unlimited', () => {
    expect(isOrderUnlimited(new BN(10), new BN(35345))).toBeFalsy()
  })
})

describe('Compare string values', () => {
  const unlimitedValue = new BigNumber(UNLIMITED_ORDER_AMOUNT.toString())

  test('is unlimited', () => {
    expect(isOrderUnlimited(unlimitedValue, new BigNumber(0))).toBeTruthy()
  })
  test('is NOT unlimited', () => {
    expect(isOrderUnlimited(new BigNumber(1923810), new BigNumber(4))).toBeFalsy()
  })
})

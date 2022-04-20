import BN from 'bn.js'
import { toPlaceValidFromOrdersParams, OrderParams, PlaceValidFromOrdersParams } from '../../../src/utils/orders'

describe('toPlaceValidFromOrdersParams - String', () => {
  test('Empty array returns an empty array too', () => {
    const given: OrderParams<string>[] = []
    const expected = {
      buyAmounts: [],
      buyTokens: [],
      sellAmounts: [],
      sellTokens: [],
      validFroms: [],
      validUntils: [],
    }
    expect(toPlaceValidFromOrdersParams(given)).toEqual(expected)
  })

  test('One order', () => {
    const given: OrderParams<string>[] = [
      { sellToken: 1, buyToken: 2, sellAmount: '3', buyAmount: '4', validFrom: 5, validUntil: 6 },
    ]
    const expected = {
      sellTokens: [1],
      buyTokens: [2],
      sellAmounts: ['3'],
      buyAmounts: ['4'],
      validFroms: [5],
      validUntils: [6],
    }
    expect(toPlaceValidFromOrdersParams(given)).toEqual(expected)
  })

  test('Three order', () => {
    const given: OrderParams<string>[] = [
      { sellToken: 1, buyToken: 2, sellAmount: '3', buyAmount: '4', validFrom: 5, validUntil: 6 },
      { sellToken: 11, buyToken: 12, sellAmount: '13', buyAmount: '14', validFrom: 15, validUntil: 16 },
      { sellToken: 21, buyToken: 22, sellAmount: '23', buyAmount: '24', validFrom: 25, validUntil: 26 },
    ]
    const expected = {
      sellTokens: [1, 11, 21],
      buyTokens: [2, 12, 22],
      sellAmounts: ['3', '13', '23'],
      buyAmounts: ['4', '14', '24'],
      validFroms: [5, 15, 25],
      validUntils: [6, 16, 26],
    }
    expect(toPlaceValidFromOrdersParams(given)).toEqual(expected)
  })
})

describe('toPlaceValidFromOrdersParams - BN', () => {
  test('Three order', () => {
    const given: OrderParams<BN>[] = [
      { sellToken: 1, buyToken: 2, sellAmount: new BN('3'), buyAmount: new BN('4'), validFrom: 5, validUntil: 6 },
      { sellToken: 11, buyToken: 12, sellAmount: new BN('13'), buyAmount: new BN('14'), validFrom: 15, validUntil: 16 },
      { sellToken: 21, buyToken: 22, sellAmount: new BN('23'), buyAmount: new BN('24'), validFrom: 25, validUntil: 26 },
    ]
    const expected: PlaceValidFromOrdersParams<BN> = {
      sellTokens: [1, 11, 21],
      buyTokens: [2, 12, 22],
      sellAmounts: [new BN('3'), new BN('13'), new BN('23')],
      buyAmounts: [new BN('4'), new BN('14'), new BN('24')],
      validFroms: [5, 15, 25],
      validUntils: [6, 16, 26],
    }
    expect(toPlaceValidFromOrdersParams(given)).toEqual(expected)
  })
})

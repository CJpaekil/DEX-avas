import BigNumber from 'bignumber.js'

import { formatPrice } from '../../../src'
import * as constants from '../../../src/const'

// Mocking default consts with a hack to force test with the standard symbols, no matter the user locale
Object.defineProperty(constants, 'DECIMALS_SYMBOL', { value: '.' })
Object.defineProperty(constants, 'THOUSANDS_SYMBOL', { value: ',' })

describe('No thousands separator', () => {
  test('price without decimals, zero decimals expected', () => {
    const price = new BigNumber('132')

    const actual = formatPrice({ price, decimals: 0 })

    expect(actual).toEqual('132')
  })
  test('price without decimals, 2 decimals expected', () => {
    const price = new BigNumber('132')

    const actual = formatPrice({ price, decimals: 2 })

    expect(actual).toEqual('132.00')
  })

  test('could have decimals separator', () => {
    const price = new BigNumber('1328')

    const actual = formatPrice({ price, decimals: 2 })

    expect(actual).toEqual('1328.00')
  })

  test('decimals rounded', () => {
    const price = new BigNumber('1.666')

    const actual = formatPrice({ price, decimals: 2 })

    expect(actual).toEqual('1.67')
  })

  test('zero', () => {
    const price = new BigNumber('0')

    const actual = formatPrice({ price })

    expect(actual).toEqual('0.0000')
  })

  test('infinity price', () => {
    const price = new BigNumber(Infinity)

    const actual = formatPrice({ price })

    expect(actual).toEqual('Infinity')
  })

  test('without zero padding, no decimals', () => {
    const price = new BigNumber(1)

    const actual = formatPrice({ price, zeroPadding: false })

    expect(actual).toEqual('1')
  })

  test('without zero padding, with decimals and zeros to remove', () => {
    const price = new BigNumber('0.123000')

    const actual = formatPrice({ price, decimals: 7, zeroPadding: false })

    expect(actual).toEqual('0.123')
  })

  test('without zero padding, with decimals and no zeros to remove', () => {
    const price = new BigNumber('0.123000')

    const actual = formatPrice({ price, decimals: 3, zeroPadding: false })

    expect(actual).toEqual('0.123')
  })

  test('zeros after decimal separator', () => {
    const price = new BigNumber('0.00737')

    const actual = formatPrice({ price, decimals: 6 })

    expect(actual).toEqual('0.007370')
  })
})

describe('with thousands separator', () => {
  test('adds separator', () => {
    const price = new BigNumber(9000.1)

    const actual = formatPrice({ price, decimals: 2, thousands: true })

    expect(actual).toEqual('9,000.10')
  })
})

describe('with single parameter', () => {
  test('formats with all defaults', () => {
    const price = new BigNumber(9000.10601)

    const actual = formatPrice(price)

    expect(actual).toEqual('9000.1060')
  })

  test('zeros after decimal separator', () => {
    const price = new BigNumber('0.00737')

    const actual = formatPrice(price)

    expect(actual).toEqual('0.0074')
  })

  test('00999 after decimal separator', () => {
    const price = new BigNumber('0.00999')

    const actual = formatPrice(price)

    expect(actual).toEqual('0.0100')
  })
  test('09999 after decimal separator', () => {
    const price = new BigNumber('0.09999')

    const actual = formatPrice(price)

    expect(actual).toEqual('0.1000')
  })
  test('89999 after decimal separator', () => {
    const price = new BigNumber('0.89999')

    const actual = formatPrice(price)

    expect(actual).toEqual('0.9000')
  })

  test('9999 after decimal separator', () => {
    const price = new BigNumber('0.9999')

    const actual = formatPrice(price)

    expect(actual).toEqual('0.9999')
  })
  test('99994 after decimal separator', () => {
    const price = new BigNumber('0.99994')

    const actual = formatPrice(price)

    expect(actual).toEqual('0.9999')
  })
  test('99995 after decimal separator', () => {
    const price = new BigNumber('0.99995')

    const actual = formatPrice(price)

    expect(actual).toEqual('1.0000')
  })
  test('rounding up 99998 after decimal separator', () => {
    const price = new BigNumber('0.99998')

    const actual = formatPrice(price)

    expect(actual).toEqual('1.0000')
  })
  test('rounding up 1.99998', () => {
    const price = new BigNumber('1.99998')

    const actual = formatPrice(price)

    expect(actual).toEqual('2.0000')
  })
})

describe('Non-standard locale', () => {
  test('decimals_symbol = , thousands_symbol = .', () => {
    Object.defineProperty(constants, 'DECIMALS_SYMBOL', { value: ',' })
    Object.defineProperty(constants, 'THOUSANDS_SYMBOL', { value: '.' })

    const price = new BigNumber('1000.1')

    const actual = formatPrice({ price, thousands: true })

    expect(actual).toEqual('1.000,1000')
  })
})

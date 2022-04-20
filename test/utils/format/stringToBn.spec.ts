import BN from 'bn.js'
import { stringToBn, ZERO } from '../../../src'

describe('With only required parameters', () => {
  describe('invalid input', () => {
    test('empty string', () => {
      const response = { amount: null, precision: 0 }
      expect(stringToBn('')).toEqual(response)
    })

    test('not a number', () => {
      const response = { amount: null, precision: 0 }
      expect(stringToBn('djas')).toEqual(response)
    })
  })

  describe('zero', () => {
    test('no decimals', () => {
      const response = { amount: ZERO, precision: 0 }
      expect(stringToBn('0')).toEqual(response)
    })

    test('with decimals', () => {
      const response = { amount: ZERO, precision: 0 }
      expect(stringToBn('0.000')).toEqual(response)
    })
  })

  describe('regular', () => {
    test('without decimals', () => {
      const response = { amount: new BN('12345'), precision: 0 }
      expect(stringToBn('12345')).toEqual(response)
    })

    test('decimals and integer', () => {
      const response = { amount: new BN('12345'), precision: 2 }
      expect(stringToBn('123.45')).toEqual(response)
    })

    test('only decimals', () => {
      const response = { amount: new BN('12345'), precision: 5 }
      expect(stringToBn('0.12345')).toEqual(response)
    })
  })
})
describe('With optional parameters', () => {
  describe('precision 0', () => {
    describe('invalid input', () => {
      test('empty string', () => {
        const response = { amount: null, precision: 0 }
        expect(stringToBn('', 0)).toEqual(response)
      })

      test('not a number', () => {
        const response = { amount: null, precision: 0 }
        expect(stringToBn('djas', 0)).toEqual(response)
      })
    })

    describe('zero', () => {
      test('no decimals', () => {
        const response = { amount: ZERO, precision: 0 }
        expect(stringToBn('0', 0)).toEqual(response)
      })

      test('with decimals', () => {
        const response = { amount: ZERO, precision: 0 }
        expect(stringToBn('0.000', 0)).toEqual(response)
      })
    })

    describe('regular', () => {
      test('without decimals', () => {
        const response = { amount: new BN('12345'), precision: 0 }
        expect(stringToBn('12345', 0)).toEqual(response)
      })

      test('decimals and integer', () => {
        const response = { amount: new BN('12345'), precision: 2 }
        expect(stringToBn('123.45', 0)).toEqual(response)
      })

      test('only decimals', () => {
        const response = { amount: new BN('12345'), precision: 5 }
        expect(stringToBn('0.12345', 0)).toEqual(response)
      })
    })
  })

  describe('precision 1', () => {
    test('input already has decimals', () => {
      const response = { amount: new BN('12345'), precision: 3 }
      expect(stringToBn('123.45', 1)).toEqual(response)
    })

    test('integer input', () => {
      const response = { amount: new BN('12345'), precision: 1 }
      expect(stringToBn('12345', 1)).toEqual(response)
    })
  })

  describe('negative precision', () => {
    test('-1', () => {
      const response = { amount: new BN('5'), precision: 0 }
      expect(stringToBn('0.5', -1)).toEqual(response)
    })
  })
})

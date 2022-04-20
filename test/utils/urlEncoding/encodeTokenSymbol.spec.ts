import { encodeTokenSymbol } from '../../../src/utils'

describe('Encoding token', () => {
  const address = '0x0000'
  test('Token with A-Z symbol', () => {
    const token = { symbol: 'TKN', address }

    expect(encodeTokenSymbol(token)).toBe(token.symbol)
  })

  test('Token with special chars', () => {
    const token = { symbol: ')(*&^%$#@!`~-\'";:.,<>?/\\', address }

    expect(encodeTokenSymbol(token)).toBe(")(*%26%5E%25%24%23%40!%60~%E2%8A%9D'%22%3B%3A.%2C%3C%3E%3F%2F%5C")
  })

  test('Token with unicode chars', () => {
    const token = { symbol: '🔥', address }

    expect(encodeTokenSymbol(token)).toBe('%F0%9F%94%A5')
  })

  test('Token without symbol', () => {
    const token = { address }

    expect(encodeTokenSymbol(token)).toBe(token.address)
  })
})

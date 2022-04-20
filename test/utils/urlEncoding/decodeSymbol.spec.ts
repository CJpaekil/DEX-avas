import { decodeSymbol } from '../../../src/utils'
describe('Decoding symbol', () => {
  test('A-Z symbol', () => {
    expect(decodeSymbol('TNK')).toBe('TNK')
  })

  test('Special chars', () => {
    expect(decodeSymbol("Token%20%2F21%20%E2%8A%9D%2055%3F%20**%20%7C%E2%8A%9D%3D%2B%23%40%25%5E%26%60'%22")).toBe(
      'Token /21 - 55? ** |-=+#@%^&`\'"',
    )
  })
  test('Dash in the symbol', () => {
    expect(decodeSymbol('TN%E2%8A%9DHUI')).toBe('TN-HUI')
  })
  test('Leading and trailing spaces', () => {
    expect(decodeSymbol('%20SPACES%20HERE%20%20')).toBe('SPACES HERE')
  })
  test('Unicode chars', () => {
    expect(decodeSymbol('Oh%20%F0%9F%92%BB%20%F0%9F%A7%B5%20%F0%9F%94%A5')).toBe('Oh 💻 🧵 🔥')
  })
  test('Address symbol', () => {
    expect(decodeSymbol('0xa09000900')).toBe('0xa09000900')
  })
})

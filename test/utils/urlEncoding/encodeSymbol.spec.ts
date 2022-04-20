import { encodeSymbol } from '../../../src/utils'

describe('Encoding symbol', () => {
  test('A-Z symbol', () => {
    expect(encodeSymbol('DAI')).toBe('DAI')
  })

  test('Special chars symbol', () => {
    expect(encodeSymbol('Token /21 - 55? ** |-=+#@%^&`\'"')).toBe(
      "Token%20%2F21%20%E2%8A%9D%2055%3F%20**%20%7C%E2%8A%9D%3D%2B%23%40%25%5E%26%60'%22",
    )
  })

  test('Should encode dash char "-"', () => {
    expect(encodeSymbol('-')).toBe('%E2%8A%9D')
  })

  test('Unicode emojis symbol', () => {
    expect(encodeSymbol('Oh 💻 🧵 🔥')).toBe('Oh%20%F0%9F%92%BB%20%F0%9F%A7%B5%20%F0%9F%94%A5')
  })

  test('Trims leading and trailing spaces', () => {
    expect(encodeSymbol('   Why would someone do something like this?   ')).toBe(
      'Why%20would%20someone%20do%20something%20like%20this%3F',
    )
  })
})

import { AssertionError } from 'assert'

export function assert<T>(val: T, message: string): asserts val is NonNullable<T> {
  if (!val) {
    throw new AssertionError({ message })
  }
}

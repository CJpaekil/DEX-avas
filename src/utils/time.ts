import { MAX_BATCH_ID } from 'const'

/**
 * Epoch in seconds
 */
export function getEpoch(): number {
  return Math.floor(Date.now() / 1000)
}

/**
 * Checks whether batchId is `never expires`
 * Using the convention which the fronted creates orders with expiration date set
 * to max uint32 when placing orders active indefinitely.
 *
 * @param batchId The expiration batch id to check
 */
export function isNeverExpiresOrder(batchId: number): boolean {
  return MAX_BATCH_ID === batchId
}

import { EventOptions, Contract, PastEventOptions } from 'web3-eth-contract'
import { Subscription } from 'web3-core-subscriptions'
import { Callback, ContractEventLog } from './gen/types'
import { EventEmitter } from 'events'

export {
  EstimateGasOptions,
  Callback,
  ContractEventLog,
  BlockType,
} from './gen/types'

export { EventOptions }

type AlmostContract = Omit<Contract, 'clone' | 'once'>

export interface ContractEvent<T> {
  (cb?: Callback<T>): Subscription<T>
  (options?: EventOptions, cb?: Callback<T>): Subscription<T>
}
export interface TypechainContractEvent<T> {
  (cb?: Callback<ContractEventLog<T>>): EventEmitter
  (options?: any, cb?: Callback<ContractEventLog<T>>): EventEmitter
}

type EventFunctionMap<T extends AlmostContract> = Omit<T['events'], 'allEvents'>

export type EventMap<T extends AlmostContract> = {
  [E in keyof EventsExceptAllEvents<T>]: InferredCallbackArgs<T['events'][E]>
}

export type EventArgs<T> = T extends TypechainContractEvent<infer U> ? U : never
export type EventsExceptAllEvents<T extends AlmostContract> = EventFunctionMap<T>

export type AllValues<T extends object> = T[keyof T]

type ChangedEvents<T extends AlmostContract> = {
  [E in keyof EventsExceptAllEvents<T>]: ContractEvent<InferredCallbackArgs<T['events'][E]>>
} & { allEvents: ContractEvent<InferredCallbackArgs<AllValues<EventsExceptAllEvents<T>>>> }

interface GenericCallback<T> {
  (cb?: Callback<T>): EventEmitter
  (opts?: any, cb?: Callback<T>): EventEmitter
}

type InferredCallbackArgs<T> = T extends GenericCallback<infer U> ? U : never

interface GetPastEvents<T extends AlmostContract> {
  <U extends keyof EventFunctionMap<T>>(event: U): Promise<InferredCallbackArgs<T['events'][U]>[]>
  <U extends keyof EventFunctionMap<T>>(
    event: U,
    options: PastEventOptions,
    callback: (error: Error, event: InferredCallbackArgs<T['events'][U]>) => void
  ): Promise<InferredCallbackArgs<T['events'][U]>[]>
  <U extends keyof EventFunctionMap<T>>(event: U, options: PastEventOptions): Promise<InferredCallbackArgs<T['events'][U]>[]>
  <U extends keyof EventFunctionMap<T>>(
    event: U,
    callback: (error: Error, event: InferredCallbackArgs<T['events'][U]>) => void
  ): Promise<InferredCallbackArgs<T['events'][U]>[]>
}

export type ExtendedContract<T extends AlmostContract> = Omit<T, 'events' | 'clone' | 'getPastEvents'> & {
  clone(): ExtendedContract<T>

  events: ChangedEvents<T>

  getPastEvents: GetPastEvents<T>
}

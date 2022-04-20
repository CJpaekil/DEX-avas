// Doesn't use ContractEvent on purpose since the mapping of events in typechain is broken
// TODO: Update when typechain fix the issue
import { Weth } from './gen/Weth'
import { ExtendedContract, EventMap } from './types'

export type WethContract = ExtendedContract<Weth>
export type WethEvents = EventMap<Weth>

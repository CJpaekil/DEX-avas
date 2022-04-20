export type Command = () => void
export type AsyncCommand = () => Promise<void>

export interface WithAddressMainnetOpt {
  addressMainnet?: string
}

export interface WithId {
  id: number
}

export interface WithSymbolAndName {
  symbol?: string
  name?: string
}

export interface WithAddress {
  address: string
}

export interface WithDecimals {
  decimals: number
}

export type TokenErc20 = WithSymbolAndName & WithAddress & WithDecimals
export type Token = TokenErc20 & WithAddressMainnetOpt & Partial<WithId>
export type TokenDex = TokenErc20 & WithAddressMainnetOpt & WithId

export interface TokenDetailsConfig extends WithSymbolAndName, WithDecimals {
  addressByNetwork: {
      [networkId: string]: string | undefined;
  };
}

// TODO: The ID is currently required for the config of the token list
//   however, it shouldn't be, the ID is loaded from the contract, and can change by network
export type TokenDetailsConfigLegacy = TokenDetailsConfig & WithId

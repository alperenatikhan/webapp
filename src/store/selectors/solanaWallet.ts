import { BN } from '@project-serum/anchor'
import { createSelector } from '@reduxjs/toolkit'
import { ISolanaWallet, solanaWalletSliceName, ITokenAccount } from '@reducers/solanaWallet'
import { keySelectors, AnyProps } from './helpers'
import { PublicKey } from '@solana/web3.js'
import { MOCK_TOKENS } from '@invariant-labs/sdk'
import { tokens } from './pools'

const store = (s: AnyProps) => s[solanaWalletSliceName] as ISolanaWallet

export const { address, balance, accounts, status } = keySelectors(store, [
  'address',
  'balance',
  'accounts',
  'status'
])

export const tokenBalance = (tokenAddress: PublicKey) =>
  createSelector(accounts, balance, (tokensAccounts, solBalance) => {
    if (tokenAddress.equals(new PublicKey(MOCK_TOKENS.SOL))) {
      return { balance: solBalance, decimals: 9 }
    } else {
      if (!tokensAccounts[tokenAddress.toString()]) {
        return { balance: new BN(0), decimals: 9 }
      }
      return {
        balance: tokensAccounts[tokenAddress.toString()].balance,
        decimals: tokensAccounts[tokenAddress.toString()].decimals
      }
    }
  })
export const tokenAccount = (tokenAddress: PublicKey) =>
  createSelector(accounts, tokensAccounts => {
    if (tokensAccounts[tokenAddress.toString()]) {
      return tokensAccounts[tokenAddress.toString()]
    }
  })

export const tokenAccountsAddress = () =>
  createSelector(accounts, tokenAccounts => {
    return Object.values(tokenAccounts).map(item => {
      return item.address
    })
  })
export interface SwapToken {
  balance: BN
  decimals: number
  symbol: string
  assetAddress: PublicKey
  name: string
  logoURI: string
}

export const swapTokens = createSelector(accounts, tokens, (allAccounts, tokens) => {
  return Object.values(tokens).map(token => ({
    ...token,
    assetAddress: token.address,
    balance: allAccounts[token.address.toString()]?.balance ?? 0
  }))
})

export const swapTokensDict = createSelector(accounts, tokens, (allAccounts, tokens) => {
  const swapTokens: Record<string, SwapToken> = {}

  Object.entries(tokens).forEach(([key, val]) => {
    swapTokens[key] = {
      ...val,
      assetAddress: val.address,
      balance: allAccounts[key]?.balance ?? 0
    }
  })

  return swapTokens
})

export type TokenAccounts = ITokenAccount & {
  symbol: string
  usdValue: BN
  assetDecimals: number
}

export const solanaWalletSelectors = {
  address,
  balance,
  accounts,
  status,
  tokenAccount
}
export default solanaWalletSelectors

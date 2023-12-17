import { type Signer, JsonRpcProvider, Wallet } from 'ethers'
import { defineStore } from 'pinia'
import invariant from 'tiny-invariant'
import { createPublicClient, type Chain, http, type PublicClient, type Abi, getAddress } from 'viem'
import { HARDHAT_PRIV_KEY, MULTICALL3_ADDRESS } from '@/constants'
import { networkMap, type AppNetwork } from '@/constants'
import { useWalletStore } from '@vue-dapp/core'

export type DappState = {
	user: User
	network: AppNetwork
	blockNumber: number
}

export type User = {
	signer: Signer | null
	address: string
	chainId: number
}

export const networkOptions = [...networkMap.keys()]

// ================ move to constants ================

export const useDappStore = defineStore('dapp', {
	state: (): DappState => ({
		user: {
			address: '',
			signer: null,
			chainId: -1,
		},
		network: 'mainnet',
		blockNumber: 0,
	}),
	getters: {
		chain(state): Chain {
			const chain = networkMap.get(state.network)
			invariant(chain, 'useDappStore.chain')
			return chain
		},
		chainId(): number {
			return this.chain.id
		},
		isNetworkUnmatched(state): boolean {
			if (!this.isConnected) return false
			return state.user.chainId !== this.chainId
		},
		rpcUrl(): string {
			return this.chain.rpcUrls.default.http[0]
		},
		explorerUrl(): string {
			return this.chain.blockExplorers?.default.url || ''
		},
		provider(): JsonRpcProvider {
			invariant(this.rpcUrl, 'rpcUrl')
			return new JsonRpcProvider(this.rpcUrl)
		},
		isConnected(state) {
			if (!state.user.address || !state.user.signer) {
				return false
			}
			return true
		},
		signer(): Signer {
			if (!this.isConnected) {
				console.warn('No wallect connected, using hardhat account #12 as signer')
				return new Wallet(HARDHAT_PRIV_KEY[12]).connect(this.provider)
			}
			invariant(this.user.signer, 'user.signer')
			return this.user.signer
		},
		client(): PublicClient {
			return createPublicClient({
				chain: this.chain,
				transport: http(),
			})
		},
		multicallAddress(state) {
			return getAddress(MULTICALL3_ADDRESS)
		},
	},
	actions: {
		setUser(user: User) {
			this.user = user
		},
		resetUser() {
			this.user.address = ''
			this.user.signer = null
			this.user.chainId = -1
		},
		multicall(functionNames: string[], address: string, abi: any) {
			return this.client.multicall({
				contracts: functionNames.map(functionName => {
					return {
						address: getAddress(address),
						abi: abi as Abi,
						functionName,
					}
				}),
				multicallAddress: getAddress(this.multicallAddress),
			})
		},
		async fetchBlockNumber() {
			const num = await this.provider.getBlockNumber()
			this.blockNumber = num
			return num
		},
		async switchChain() {
			const { connector } = storeToRefs(useWalletStore())
			try {
				if (connector.value) {
					if (this.chainId === 421613) {
						await connector.value.switchChain?.(421613, {
							chainId: '0x66eed',
							chainName: 'Arbitrum Goerli',
							nativeCurrency: {
								symbol: 'AGOR',
								decimals: 18,
							},
							rpcUrls: ['https://goerli-rollup.arbitrum.io/rpc'],
							blockExplorerUrls: ['https://goerli.arbiscan.io/'],
						})
					} else {
						await connector.value.switchChain?.(this.chainId)
					}
				}
			} catch (err: any) {
				console.error(err)
			}
		},
	},
	persist: {
		key: 'selectedNetwork',
		paths: ['network'],
	},
})

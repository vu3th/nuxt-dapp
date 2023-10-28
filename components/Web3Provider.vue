<script setup lang="ts">
import { useDappStore } from '@/stores/useDappStore'
import { storeToRefs } from 'pinia'
import { ethers } from 'ethers'

import { MetaMaskConnector, useWalletStore } from '@vue-dapp/core'
import { Board } from '@vue-dapp/vd-board'

const dappStore = useDappStore()
const { isConnected, user } = storeToRefs(dappStore)

const { onActivated, onChanged, onDeactivated } = useWalletStore()

onActivated(async ({ address, provider }) => {
	const ethersProvider = new ethers.BrowserProvider(provider)
	const signer = await ethersProvider.getSigner()
	const network = await ethersProvider.getNetwork()

	dappStore.setUser({
		address,
		signer,
		chainId: Number(network.chainId),
	})
})

onChanged(async ({ address, provider }) => {
	const ethersProvider = new ethers.BrowserProvider(provider)
	const signer = await ethersProvider.getSigner()
	const network = await ethersProvider.getNetwork()

	dappStore.setUser({
		address,
		signer,
		chainId: Number(network.chainId),
	})
})

onDeactivated(() => {
	dappStore.resetUser()
})

const connectors = [new MetaMaskConnector()]

function connectErrorHandler(err: any) {
	console.error('ConnectError', err)
}
function autoConnectErrorHandler(err: any) {
	console.error('AutoConnectError', err)
}

watch(
	() => dappStore.network,
	() => {
		console.log('Network changed')
	},
)

watch(isConnected, () => {
	if (isConnected.value) {
		console.log('Wallet connected', user.value)
	} else {
		console.log('Wallet disconnected', user.value)
	}
})
</script>

<template>
	<div>
		<slot />

		<Board
			:connectors="connectors"
			dark
			:autoConnectErrorHandler="autoConnectErrorHandler"
			:connectErrorHandler="connectErrorHandler"
		/>
	</div>
</template>

<style lang="scss"></style>

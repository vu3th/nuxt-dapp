<script lang="ts" setup>
import { type WalletContext, MetaMaskConnector, useVueDapp } from '@vue-dapp/core'
import { WalletConnectConnector } from '@vue-dapp/walletconnect'
import { DappProvider, useBoardStore } from '@vue-dapp/vd-board'
import '@vue-dapp/vd-board/dist/style.css'

const pinia = usePinia()
const boardStore = useBoardStore(pinia)

const connectors = [
	new MetaMaskConnector(),
	new WalletConnectConnector({
		projectId: '3f3c98042b194264687bf59e104c534a',
		chains: [1],
		showQrModal: true,
		qrModalOptions: {
			themeMode: 'dark',
			themeVariables: undefined,
			desktopWallets: undefined,
			walletImages: undefined,
			mobileWallets: undefined,
			enableExplorer: true,
			privacyPolicyUrl: undefined,
			termsOfServiceUrl: undefined,
		},
	}),
]

async function handleConnect({ provider, address, chainId }: WalletContext) {
	console.log('handleConnect')
}

function handleDisconnect() {
	console.log('handleDisconnect')
}

const { isConnected, address, chainId, disconnect } = useVueDapp(pinia)

function onClickConnectButton() {
	if (!isConnected.value) {
		boardStore.open()
	} else {
		disconnect()
	}
}
</script>

<template>
	<div>
		<DappProvider :pinia="pinia" :connectors="connectors" @connect="handleConnect" @disconnect="handleDisconnect">
			<button @click="onClickConnectButton">{{ isConnected ? 'Disconnect' : 'Connect Wallet' }}</button>

			<p v-if="chainId !== -1">Chain ID: {{ chainId }}</p>
			<p>{{ address }}</p>
		</DappProvider>
	</div>
</template>

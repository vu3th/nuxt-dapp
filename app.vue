<script lang="ts" setup>
import { BrowserWalletConnector, VueDappProvider, type ConnWallet } from '@vue-dapp/core'
import { VueDappModal } from '@vue-dapp/modal'
import '@vue-dapp/modal/dist/style.css'

import { WalletConnectConnector } from '@vue-dapp/walletconnect'
import { CoinbaseWalletConnector } from '@vue-dapp/coinbase'

const { status, isConnected, address, chainId, error, disconnect, addConnectors } = useVueDapp()

const isModalOpen = ref(false)

function onClickConnectBtn() {
	if (isConnected.value) disconnect()
	else isModalOpen.value = true
}

if (process.client) {
	addConnectors([
		new BrowserWalletConnector(),
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
		new CoinbaseWalletConnector({
			appName: 'Vue Dapp',
			jsonRpcUrl: `https://mainnet.infura.io/v3/ff6a249a74e048f1b413cba715f98d07`,
		}),
	])
}

function handleConnect(wallet: ConnWallet) {
	console.log('handleConnect', wallet)
}

function handleDisconnect() {
	console.log('handleDisconnect')
}
</script>

<template>
	<div>
		<VueDappProvider @connect="handleConnect" @disconnect="handleDisconnect">
			<button @click="onClickConnectBtn">{{ isConnected ? 'Disconnect' : 'Connect' }}</button>

			<div>status: {{ status }}</div>
			<div>isConnected: {{ isConnected }}</div>
			<div>error: {{ error }}</div>

			<div v-if="isConnected">
				<div>chainId: {{ chainId }}</div>
				<div>address: {{ address }}</div>
			</div>

			<VueDappModal v-model="isModalOpen" dark auto-connect />
		</VueDappProvider>
	</div>
</template>

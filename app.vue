<script lang="ts" setup>
import { BrowserWalletConnector } from '@vue-dapp/core'
import { VueDappModal, useVueDappModal } from '@vue-dapp/modal'
import '@vue-dapp/modal/dist/style.css'

import { WalletConnectConnector } from '@vue-dapp/walletconnect'
import { CoinbaseWalletConnector } from '@vue-dapp/coinbase'

const { isConnected, wallet, disconnect, addConnectors } = useVueDapp()

function onClickConnectBtn() {
	if (isConnected.value) {
		disconnect()
	} else {
		const { open } = useVueDappModal()
		open()
	}
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
</script>

<template>
	<div>
		<button @click="onClickConnectBtn">{{ isConnected ? 'Disconnect' : 'Connect' }}</button>

		<div>status: {{ wallet.status }}</div>
		<div>isConnected: {{ isConnected }}</div>
		<div>error: {{ wallet.error }}</div>

		<div v-if="isConnected">
			<div>chainId: {{ wallet.chainId }}</div>
			<div>address: {{ wallet.address }}</div>
		</div>

		<VueDappModal dark auto-connect />
	</div>
</template>

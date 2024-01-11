<script lang="ts" setup>
import { type WalletContext, MetaMaskConnector, VueDappProvider } from '@vue-dapp/core'
import { WalletConnectConnector } from '@vue-dapp/walletconnect'
import { CoinbaseWalletConnector } from '@vue-dapp/coinbase'

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
	new CoinbaseWalletConnector({
		appName: 'Vue Dapp',
		jsonRpcUrl: `https://mainnet.infura.io/v3/ff6a249a74e048f1b413cba715f98d07`,
	}),
]

function handleConnect({ provider, address, chainId }: WalletContext) {
	console.log('handleConnect')
}

function handleDisconnect() {
	console.log('handleDisconnect')
}

const { status, isConnected, address, chainId, error, disconnect, connectWith } = useVueDapp()

function onClickMetaMask() {
	if (!isConnected.value) {
		connectWith(connectors[0])
	}
}

function onClickWalletConnect() {
	if (!isConnected.value) {
		connectWith(connectors[1])
	}
}

function onClickCoinbase() {
	if (!isConnected.value) {
		connectWith(connectors[2])
	}
}
</script>

<template>
	<div>
		<VueDappProvider @connect="handleConnect" @disconnect="handleDisconnect">
			<div v-if="!isConnected">
				<button :disabled="status !== 'idle'" @click="onClickMetaMask">Connect with MetaMask</button>
				<button :disabled="status !== 'idle'" @click="onClickWalletConnect">Connect with WalletConnect</button>
				<button :disabled="status !== 'idle'" @click="onClickCoinbase">Connect with Coinbase</button>
			</div>
			<button v-else @click="disconnect">Disconnect</button>

			<div>status: {{ status }}</div>
			<div>isConnected: {{ isConnected }}</div>
			<div>error: {{ error }}</div>

			<div v-if="isConnected">
				<div v-if="chainId !== -1">chainId: {{ chainId }}</div>
				<div>address: {{ address }}</div>
			</div>
		</VueDappProvider>
	</div>
</template>

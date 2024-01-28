<script lang="ts" setup>
import { BrowserWalletConnector, VueDappProvider, type ConnWallet, RDNS } from '@vue-dapp/core'
import { WalletConnectConnector } from '@vue-dapp/walletconnect'
import { CoinbaseWalletConnector } from '@vue-dapp/coinbase'

const { status, isConnected, address, chainId, error, disconnect, connectTo, addConnectors } = useVueDapp()

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

function onClickMetamask() {
	if (!isConnected.value) {
		connectTo('BrowserWallet', { rdns: RDNS.metamask })
	}
}

function onClickWalletConnect() {
	if (!isConnected.value) {
		connectTo('WalletConnect')
	}
}

function onClickCoinbase() {
	if (!isConnected.value) {
		connectTo('CoinbaseWallet')
	}
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
			<div v-if="!isConnected">
				<button :disabled="status !== 'idle'" @click="onClickMetamask">Connect with MetaMask</button>
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

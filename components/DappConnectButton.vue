<script setup lang="ts">
import { storeToRefs } from 'pinia'
import copy from 'copy-to-clipboard'
import { useDappStore } from '@/stores/useDappStore'
import { useBoardStore } from '@vue-dapp/vd-board'
import { shortenAddress, useWalletStore } from '@vue-dapp/core'

const pinia = usePinia()

const boardStore = useBoardStore(pinia)

const walletStore = useWalletStore(pinia)
const { status, isConnected } = storeToRefs(walletStore)

const dappStore = useDappStore()
const { isNetworkUnmatched, user } = storeToRefs(dappStore)
</script>

<template>
	<div>
		<div v-if="isConnected" class="flex items-center flex-col">
			<div
				class="h-[36px] px-4 rounded-3xl sm:inline-flex items-center gap-x-2 bg-gray-100"
				:class="isNetworkUnmatched ? 'border border-red-500' : ''"
			>
				<p v-if="isNetworkUnmatched" class="text-sm">Network Unmatched</p>
				<Icon
					name="i-ic:baseline-switch-access-shortcut"
					v-if="isNetworkUnmatched"
					class="clickable"
					@click="dappStore.switchChain"
				/>

				<p v-else>{{ shortenAddress(user.address) }}</p>

				<Icon
					name="i-ic-baseline-content-copy"
					v-if="!isNetworkUnmatched"
					class="clickable"
					@click="copy(user.address)"
				/>

				<Icon name="i-ic:baseline-logout" class="clickable" @click="walletStore.disconnect" />
			</div>
		</div>

		<BaseButton class="rounded-3xl w-auto" v-else @click="boardStore.open" :disabled="status === 'connecting'">
			{{ status === 'connecting' ? 'Connecting...' : '' }}
			<Icon name="i-octicon-plug-24" v-if="status !== 'connecting'" />
		</BaseButton>
	</div>
</template>

<style lang="scss"></style>

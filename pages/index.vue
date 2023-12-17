<script setup lang="ts">
import { getAddress } from 'viem'
import fundingRoundJson from '@/FundingRound.json'

const fundingRoundProps = computed(() => {
	return {
		title: 'FundingRound.sol',
		address: getAddress('0x806F08B7DD31fE0267e8c70C4bF8C4BfbBddE760'),
		useContractOptions: { abi: fundingRoundJson.abi },
	}
})
</script>

<template>
	<div class="p-5">
		<div class="flex flex-col justify-center w-full items-center">
			<div class="max-w-[800px] w-full items-center flex flex-col gap-y-2">
				<ContractUI v-bind="fundingRoundProps" />
			</div>
		</div>
	</div>
</template>

<style lang="scss"></style>

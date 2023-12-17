<script lang="ts" setup>
import { ModalsContainer } from 'vue-final-modal'
</script>

<template>
	<div>
		<DappProvider>
			<TheHeader />
			<slot />
		</DappProvider>
		<ModalsContainer />
	</div>
</template>

import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	vite: {
		plugins: [nodePolyfills()], // only for @vue-dapp/coinbase
	},
	modules: [
		'@vue-dapp/nuxt',
		[
			'@pinia/nuxt',
			{
				autoImports: ['defineStore', 'storeToRefs'],
			},
		],
	],
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
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

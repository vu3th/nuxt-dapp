import { useVueDapp as _useVueDapp } from '@vue-dapp/core'

export function useVueDapp() {
	const pinia = useNuxtApp().$pinia
	return _useVueDapp(pinia)
}

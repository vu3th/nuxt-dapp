import { useModal } from 'vue-final-modal'

// components
import EventModal from '@/components/modals/EventModal.vue'

type ShowEventModalOption = {
	address: string
	eventName: string
	abi: any
}

export function showEventModal(options: ShowEventModalOption) {
	const { open, close } = useModal({
		component: EventModal,
		attrs: {
			...options,
			onConfirm() {
				close()
			},
			onClosed() {
				close()
			},
		},
	})
	open()
}

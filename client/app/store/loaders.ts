import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAccountLayoutLoaderStore = defineStore('account-layout-loader', () => {
	const showLoader = ref(true)
	let stack: Promise<unknown>[] = []
	let timeout: NodeJS.Timeout

	const runAwaiting = () => {
		showLoader.value = true

		const stackLen = stack.length

		Promise.all(stack).then(() => {
			if (stackLen === stack.length) {
				showLoader.value = false
				stack = []
			}
		})
	}

	const addPromise = (promise: Promise<unknown>) => {
		stack.push(promise)

		clearTimeout(timeout)
		timeout = setTimeout(runAwaiting, 10)
	}

	return {
		showLoader: computed(() => showLoader.value),
		addPromise
	}
})

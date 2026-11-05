import type { NuxtLinkProps } from '#app'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface BreadcrumbChainLink {
	name: string
	link: NuxtLinkProps
}

export type BreadcrumbChain = BreadcrumbChainLink[]

export const useBreadcrumbStore = defineStore('breadcrumb', () => {
	const chain = ref<BreadcrumbChain>([])
	const setChain = (c: BreadcrumbChain) => chain.value = c
	const clearChain = () => chain.value = []

	return {
		chain: computed(() => chain.value),
		setChain, clearChain
	}
})

import { useRequestEvent } from 'nuxt/app'

export const useNoindexHeader = () => {
	if (import.meta.server) {
		const request = useRequestEvent()
		request?.node.res.appendHeader('X-Robots-Tag', 'noindex, nofollow, noarchive')
	}
}

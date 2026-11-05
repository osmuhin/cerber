import { useNuxtApp } from '#app'

type UseSingleton = <T>(
	key: string,
	fn: (deleteInstance: () => boolean) => T
) => T

export const useSingleton: UseSingleton = (key, callback) => {
	const nuxtApp = useNuxtApp()

	nuxtApp._singleton = nuxtApp._singleton || {}

	const deleteInstance = () => delete nuxtApp._singleton[key]

	return nuxtApp._singleton[key] = nuxtApp._singleton[key] || callback(deleteInstance) || true
}

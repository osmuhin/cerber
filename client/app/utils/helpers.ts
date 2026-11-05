import { trim } from 'lodash-es'
import { Buffer } from 'buffer'
import { useRouter, useRuntimeConfig, useSingleton } from '#imports'

export const storageUrl = (path: string) => {
	return trim(useRuntimeConfig().public.storageBaseUrl, '/') + '/' + trim(path, '/')
}

export const apiBaseUrl = () => {
	const config = useRuntimeConfig()

	return import.meta.server ? config.apiBaseUrl : config.public.apiBaseUrl
}

export const replaceView = (routeName: string) => {
	const router = useRouter()
	const targetRoute = router.getRoutes().find(route => route.name === routeName)
	const currentRoute = router.currentRoute.value.matched[0]

	if (targetRoute) {
		router.addRoute({
			...currentRoute,
			components: targetRoute.components,
			meta: targetRoute.meta
		})

		const promise = router.replace({ force: true })
		router.addRoute(currentRoute)

		return promise
	}
}

export const uid = () => Date.now().toString(36) + Math.random().toString(36).substring(2)

export const parseJwt = <T>(jwt: string): T => {
	const base64Url = jwt.split('.')[1]
	const json = Buffer.from(base64Url, 'base64').toString()

	return JSON.parse(json)
}

export const isJwtExpired = (jwt: string): boolean => {
	const payload = parseJwt<{ exp: number }>(jwt)

	if ('exp' in payload) {
		const expiration = payload.exp

		return new Date().getTime() > new Date(expiration*1000).getTime()
	}

	return false
}

export const hasHttpProtocol = (url: string): boolean => {
	const httpSchemeRegExp = /^https?:\/\//i

	return httpSchemeRegExp.test(url)
}

export const isIPv4 = (string: string): boolean => {
	const IPV4_REGEXP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(\:\d{1,5})?($|\/)/i

	const matches = string.match(IPV4_REGEXP)

	if (!matches?.length) {
		return false
	}

	const [ip, port] = trim(matches[0], '/').split(':')

	if (port !== void 0 && +port > 65535) {
		return false
	}

	return !ip.split('.', 4).find(number => +number > 255)
}

export const isUrl = (string: string): boolean => {
	const DOMAIN_REGEXP = /^(?!-)[A-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-z]{2,6}($|\/)/i

	return hasHttpProtocol(string) ||
		DOMAIN_REGEXP.test(string) ||
		isIPv4(string)
}

export const lockAsyncProcess = <T extends Promise<unknown>>(key: string, fn: () => T): T => {
	return useSingleton(key, deleteInstance => {
		try {
			return fn()
		} finally {
			deleteInstance()
		}
	})
}

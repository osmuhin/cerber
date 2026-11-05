import type { CookieOptions } from 'nuxt/app'
import type { Ref, WatchOptions } from 'vue'
import { watch } from 'vue'
import { defaultsDeep, kebabCase, omit } from 'lodash-es'
import { useCookie, useState } from 'nuxt/app'
import { useSingleton } from '~/composables/use-singleton'

export interface StorageDriver<T> {
	uid: string
	read(key: string): T
	write(key: string, value: T): void
}

export type DefinedStorage<T> = [state: Ref<T>, write: () => void]

const stringify = (data: unknown): string => typeof data === 'object' ? JSON.stringify(data) : `${data}`

const guessJson = <T>(rawData: string | null | undefined, init?: () => T | null): T | null => {
	if (!rawData) {
		return init ? init() : null
	}

	try {
		return JSON.parse(rawData) as T;
	} catch (e) {
		return rawData as T
	}
}

export function cookieStorageDriver<T>(init: () => T, config?: Omit<CookieOptions, 'watch'> & { readonly?: false | undefined; }): StorageDriver<T>
export function cookieStorageDriver<T>(init?: () => T, config?: Omit<CookieOptions, 'watch'> & { readonly?: false | undefined; }): StorageDriver<T | null>
export function cookieStorageDriver<T>(
	init?: () => T,
	config: Omit<CookieOptions, 'watch'> & { readonly?: false | undefined; } = {}
): StorageDriver<T | null> {
	const opts = defaultsDeep(omit(config, 'watch'), {
		sameSite: 'strict',
		maxAge: 2147483647
	})

	const read = (key: string) => guessJson(useCookie(key, opts).value, init)

	const write = (key: string, value: T) => useCookie(key, opts).value = stringify(value)

	return { uid: 'cookie', read, write }
}

export function localStorageDriver<T>(init: () => T): StorageDriver<T>
export function localStorageDriver<T>(init?: () => T): StorageDriver<T | null>
export function localStorageDriver<T>(init?: () => T): StorageDriver<T | null> {
	if (import.meta.server) {
		throw new Error('There is impossible to use localStorage driver on the server side')
	}

	const read = (key: string) => guessJson(window.localStorage.getItem(key), init)

	const write = (key: string, value: T) => window.localStorage.setItem(key, stringify(value))

	return { uid: 'localstorage', read, write }
}

export function dummyStorageDriver<T>(init: () => T): StorageDriver<T>
export function dummyStorageDriver<T>(init?: () => T): StorageDriver<T | null>
export function dummyStorageDriver<T>(init?: () => T): StorageDriver<T | null> {
	const read = () => guessJson(void 0, init)

	const write = () => void 0

	return { uid: 'dummy', read, write }
}

export const defineStorage = <T>(key: string, driver: StorageDriver<T>, watchOptions: WatchOptions | false = {}): DefinedStorage<T> => {
	const stateKey = kebabCase(`storage-${driver.uid}-${key}`)

	return useSingleton(stateKey, () => {
		const storageKey = kebabCase(`app-${key}`)
		const state = useState<T>(stateKey, () => driver.read(storageKey))

		const write = () => driver.write(storageKey, state.value)

		watchOptions !== false && watch(state, write, watchOptions)

		return [ state, write ]
	})
}

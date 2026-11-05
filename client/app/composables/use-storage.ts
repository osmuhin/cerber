import type { WatchOptions } from 'vue'
import type { CookieOptions } from 'nuxt/app'
import type { DefinedStorage } from '~/utils/storages'
import {
	defineStorage, cookieStorageDriver, localStorageDriver, dummyStorageDriver
} from '~/utils/storages'

type Watch = { watch?: WatchOptions | false }

type CookieStorageConfig = Omit<CookieOptions, 'watch'> & { readonly?: false | undefined; } & Watch

type LocalStorageConfig = Watch

/****************** Cookie storage ******************/

export function useCookieStorage<T>(key: string, init: () => T, config?: CookieStorageConfig): DefinedStorage<T>
export function useCookieStorage<T>(key: string, init?: () => T, config?: CookieStorageConfig): DefinedStorage<T | null>

export function useCookieStorage<T>(
	key: string,
	init?: () => T,
	config: CookieStorageConfig = {}
) {
	return defineStorage(key, cookieStorageDriver(init, config), config.watch)
}

/****************** Localstorage ******************/

export function useLocalStorage<T>(key: string, init: () => T, config?: LocalStorageConfig): DefinedStorage<T>
export function useLocalStorage<T>(key: string, init?: () => T, config?: LocalStorageConfig): DefinedStorage<T | null>

export function useLocalStorage<T>(
	key: string,
	init?: () => T,
	config: LocalStorageConfig = {}
) {
	const driver = import.meta.server ? dummyStorageDriver(init) : localStorageDriver(init)

	return defineStorage(key, driver, config.watch)
}

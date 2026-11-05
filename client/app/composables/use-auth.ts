import { useNuxtApp } from '#app'

export type AuthType = Parameters<ReturnType<typeof useNuxtApp>['$resolveAuthProvider']>[0]

export const useAuth = (provider: AuthType) => {
	return useNuxtApp().$resolveAuthProvider(provider)
}

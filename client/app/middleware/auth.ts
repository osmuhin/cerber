import { useAuth } from '~/composables/use-auth'
import { defineNuxtRouteMiddleware } from 'nuxt/app'
import { useNoindexHeader } from '~/composables/use-noindex-header'
import { replaceView } from '~/utils/helpers'

export default defineNuxtRouteMiddleware(async (to) => {
	useNoindexHeader()

	to.meta.layout = to.meta.layout || 'account'

	const { canSign } = useAuth('default')

	if (!canSign()) {
		return replaceView('auth-sign-in')
	}
})

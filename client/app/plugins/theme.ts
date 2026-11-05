import { defineNuxtPlugin } from 'nuxt/app'
import { useTheme, type Theme } from '~/composables/use-theme'
import { useCookieStorage } from '~/composables/use-storage'

export default defineNuxtPlugin(async () => {
	const [state] = useCookieStorage<Theme>(
		'color-mode',
		() => ({ mode: 'system', scheme: 'dark' }),
		{ watch: { deep: true } }
	)

	return {
		provide: {
			theme: useTheme(state)
		}
	}
})

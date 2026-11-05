import type { Ref } from 'vue'
import { computed, watch } from 'vue'

export type ThemeMode = 'system' | 'light' | 'dark'

export type ColorScheme = 'light' | 'dark'

export interface Theme {
	mode: ThemeMode
	scheme: ColorScheme
}

export const useTheme = (state: Ref<Theme>) => {
	const darkModePreference = import.meta.client ? window.matchMedia('(prefers-color-scheme: dark)') : null

	const resolveScheme = (mode: ThemeMode) => {
		if (mode === 'system') {
			return darkModePreference && darkModePreference.matches ? 'dark' : 'light'
		}

		return mode
	}

	const refreshStateScheme = () => state.value.scheme = resolveScheme(state.value.mode)

	const setMode = (mode: ThemeMode) => {
		state.value.mode = mode
		refreshStateScheme()
	}

	if (import.meta.client) {
		refreshStateScheme()

		darkModePreference?.addEventListener('change', refreshStateScheme)

		document.body.addEventListener('transitionend', () => {
			document.documentElement.classList.remove('theme-changing')
		})

		watch(() => state.value.scheme, () => {
			document.documentElement.classList.add('theme-changing')
		})
	}

	return {
		mode: computed(() => state.value.mode),
		scheme: computed(() => state.value.scheme),
		setMode
	}
}

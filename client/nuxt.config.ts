import svgLoader from 'vite-svg-loader'
import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-11-05',
	devtools: { enabled: false },
	vite: {
		plugins: [
			svgLoader({ defaultImport: 'component' }),
			tailwindcss()
		]
	},
	css: [
		'~/assets/css/fonts.scss',
		'~/assets/css/tailwind.css'
	],
	components: false,
	app: {
		rootId: 'app',
		buildAssetsDir: process.env.NODE_ENV === 'production' ? '/assets/' : void 0,
	},
	imports: {
		autoImport: false
	},
	icon: {
		mode: 'svg',
		localApiEndpoint: '/client-api/icon',
		fetchTimeout: 0
	},
	modules: [
		'@nuxt/icon',
		'@pinia/nuxt'
	],
	pinia: {
		storesDirs: ['./app/store/**'],
	},
	runtimeConfig: {
		public: {
			storageBaseUrl: process.env.STORAGE_URL,
			apiBaseUrl: process.env.CLIENT_API_URL,
			disableHttpEncryption: process.env.DISABLE_HTTP_ENCRYPTION,
			consoleLogDecryptedResponse: process.env.CONSOLE_LOG_DECRYPTED_RESPONSE
		},
		apiBaseUrl: process.env.SERVER_API_URL
	}
})

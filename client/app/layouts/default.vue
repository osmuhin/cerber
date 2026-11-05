<template>
	<div>
		<ScreenSize />
		<slot>
			<NuxtPage />
		</slot>
	</div>
</template>

<script setup lang="ts">

import { useHead, useNuxtApp } from '#imports'
import ScreenSize from '~/components/dev/ScreenSize.vue'
import { useNoindexHeader } from '~/composables/use-noindex-header'

useNoindexHeader()

useHead({
	title: 'Cerber',
	htmlAttrs: {
		class: useNuxtApp().$theme.scheme,
		lang: 'ru-RU'
	},
	link: [
		{ rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
		{ rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
		{ rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
		{ rel: 'manifest', href: '/favicon/site.webmanifest' },
		{ rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#d5aa4f' },
		{ rel: 'shortcut icon', href: '/favicon/favicon.ico' },
	],
	meta: [
		{ name: 'msapplication-TileColor', content: '#000000' },
		{ name: 'msapplication-config', content: '/favicon/browserconfig.xml' },
		{ name: 'theme-color', content: '#ffffff' },
	]
})

</script>

<style>

body {
	background-color: #f9f9f9;
	color: #000;
}

html.dark {
	body {
		background-color: #000;
		color: #fff;
	}
}

</style>

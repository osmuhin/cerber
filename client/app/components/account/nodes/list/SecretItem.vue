<template>
	<UiClickable
		class="secret-item w-full flex items-center gap-3 h-10 hover:bg-gray-50 dark:hover:bg-gray-850 px-4 rounded-lg"
		:nuxt-link="{ to: '/' }"
	>
		<SecretIcon class="w-7 h-7" :icon="icon" />
		<span class="font-medium">{{ document.name }}</span>
	</UiClickable>
</template>

<script setup lang="ts">

import type { Document, NewDocument } from '~/repositories/adapters/node-adapter'
import UiClickable from '~/components/ui/Clickable.vue'
import SecretIcon, { type SecretIconProps } from '~/components/account/nodes/list/SecretIcon.vue'

defineProps<{ document: Document | NewDocument, icon: SecretIconProps['icon'] }>()

</script>

<style>

.secret-item {
	&:hover {
		.secret-icon--letter {
			background-color: var(--color-gray-100);
		}
	}
}

html.dark {
	.secret-item {
		&:hover {
			.secret-icon--letter {
				background-color: var(--color-gray-800);
			}
		}
	}
}

</style>

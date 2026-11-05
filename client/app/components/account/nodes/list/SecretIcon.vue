<template>
	<div class="secret-icon--letter aspect-square bg-gray-50 dark:bg-gray-850 flex items-center justify-center rounded-md" v-if="icon[0] === 'letter'">
		<span class="text-gray-700 dark:text-gray-400 font-medium text-lg select-none">{{ firstLetter }}</span>
		<slot></slot>
	</div>
	<div class="aspect-square flex items-center justify-center rounded-lg overflow-hidden" v-else-if="icon[0] === 'img'">
		<img class="w-full h-full object-contain" :src="icon[1]" />
		<slot></slot>
	</div>
</template>

<script setup lang="ts">

import { computed } from 'vue'

export interface SecretIconProps {
	icon: ['img' | 'letter', string]
}

const props = defineProps<SecretIconProps>()
const firstLetter = computed(() => props.icon[1].slice(0, 1).toUpperCase())

</script>

<template>
	<div class="secret-group-preview rounded-xl border border-gray-100 dark:border-gray-850 p-3">
		<div class="font-medium text-sm truncate">{{ name }}</div>
	</div>
</template>

<script setup lang="ts">

defineProps<{
	name: string
	preview?: unknown[]
}>()

</script>

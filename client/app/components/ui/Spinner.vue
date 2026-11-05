<template>
	<SpinnerSvg class="spinner" :style="{ width: resolvedSize, height: resolvedSize }" />
</template>

<script setup lang="ts">

import SpinnerSvg from '~/assets/svg/spinner.svg'
import { computed } from '#imports'

const props = withDefaults(
	defineProps<{ size?: string|number }>(),
	{ size: 38 }
)

// @ts-ignore
const resolvedSize = computed(() => isNaN(props.size) ? props.size : `${props.size}px`)

</script>

<style scoped lang="scss">

.spinner {
	animation: spin .65s linear infinite;
}

@keyframes spin {
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(360deg);
	}
}

</style>

<template>
	<div
		class="ui-press-n-hold"
		:class="{ holding }"
		:style="{ 'transition-duration': holding ? `${activatingDuration - 100}ms` : '200ms' }"
		@mousedown="startHolding"
		@mouseup="stopHolding"
		@mouseleave="stopHolding"
	>
		<slot></slot>
	</div>
</template>

<script setup lang="ts">

import { ref } from 'vue'

const props = withDefaults(
	defineProps<{ activatingDuration?: number, enable?: boolean }>(),
	{ activatingDuration: 300, enable: true }
)
const emit = defineEmits<{ (e: 'hold'): void }>()

const holding = ref(false)
let holdingTimeout: NodeJS.Timeout | undefined

const startHolding = () => {
	if (props.enable) {
		holding.value = true
		holdingTimeout = setTimeout(() => {
			emit('hold')
			stopHolding()
		}, props.activatingDuration)
	}
}

const stopHolding = () => {
	holding.value = false
	clearTimeout(holdingTimeout)
}

</script>

<style scoped>

.ui-press-n-hold {
	transition: transform .2s ease;

	&.holding {
		transition: transform .3s linear .1s;
		transform: scale(.95);
	}
}

</style>

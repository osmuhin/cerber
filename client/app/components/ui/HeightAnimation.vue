<template>
	<div class="relative">
		<div class="spacer" :style="{ transition: allowTranstion ? transition : '' }" ref="$spacer"></div>

		<div class="absolute top-0 inset-x-0" ref="$slot">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">

import { ref, onMounted, onUnmounted, computed } from '#imports'

const props = withDefaults(defineProps<{
	transitionDuration?: number
	transitionDelay?: number
	transitionTimingFunction?: string
}>(), {
	transitionDuration: 250,
	transitionDelay: 0,
	transitionTimingFunction: 'ease',
})

const $slot = ref<HTMLElement>()
const $spacer = ref<HTMLElement>()
const allowTranstion = ref(false)

let observer: ResizeObserver

const transition = computed(() => `max-height ${props.transitionDuration}ms ${props.transitionTimingFunction} ${props.transitionDelay}ms`)

const heightChanged = () => {
	if (!$slot.value || !$spacer.value) {
		return
	}

	$spacer.value.style.maxHeight = $slot.value.getBoundingClientRect().height + 'px'
}

onMounted(() => {
	observer = new ResizeObserver(heightChanged)
	observer.observe($slot.value as HTMLElement)

	setTimeout(() => allowTranstion.value = true, 500)
})

onUnmounted(() => observer.disconnect())

</script>

<style scoped lang="scss">

.spacer {
	max-height: 0;
	height: 100000px;
}

</style>

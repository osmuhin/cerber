<template>
	<UiHeightAnimation>
		<transition>
			<div
				class="ui-validation-error text-sm text-red-500 tracking-wide font-light"
				v-if="show"
				v-bind="useAttrs()"
			>
				<slot></slot>
			</div>
		</transition>
	</UiHeightAnimation>
</template>

<script setup lang="ts">

import { useAttrs } from 'vue'
import UiHeightAnimation from './HeightAnimation.vue'

export interface ValidationErrorProps {
	show: boolean
}

defineProps<ValidationErrorProps>()
defineOptions({ inheritAttrs: false })

</script>

<style>

.ui-validation-error {
	&.v-enter-active, &.v-leave-active {
		transition: opacity .25s ease;
	}

	&.v-enter-from, &.v-leave-to {
		opacity: 0;
	}
}

</style>

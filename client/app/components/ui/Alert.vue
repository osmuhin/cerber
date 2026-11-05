<template>
	<HeightAnimation>
		<transition>
			<div
				class="alert"
				:class="[`alert-${props.appearance}`]"
				v-bind="useAttrs()"
				v-if="show"
				role="alert"
			>
				<ExclamationMark class="alert-icon w-5 h-5" v-if="isError" />
				<slot></slot>
			</div>
		</transition>
	</HeightAnimation>
</template>

<script lang="ts" setup>

import ExclamationMark from '~/assets/svg/Monochrome=exclamationmark.circle.fill.svg'
import HeightAnimation from '~/components/ui/HeightAnimation.vue'
import { computed, useAttrs } from '#imports'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
	appearance?: 'success' | 'error' | 'warning' | 'primary',
	show?: boolean
}>(), { appearance: 'primary', show: true })

const isError = computed(() => props.appearance === 'error')

</script>

<style>

.alert {
	min-height: 46px;
	display: flex;
	align-items: center;
	padding: 14px 18px;
	line-height: 1.2;

	&.v-enter-active, &.v-leave-active {
		transition: opacity .25s ease, transform .25s ease;
	}

	&.v-enter-from, &.v-leave-to {
		opacity: 0;
		transform: scale(.9)
	}
}

.alert-icon {
	align-self: flex-start;
	margin-right: 8px;
}

.alert-error {
	background-color: color-mix(in oklab, var(--color-red-500) 15%, transparent);
	color: var(--color-red-500);
	border-radius: 8px;
}

</style>

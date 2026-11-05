<template>
	<UiClickable class="ui-btn relative flex items-center" :class="classes">
		<slot></slot>
	</UiClickable>
</template>

<script setup lang="ts">

import { computed } from 'vue'
import UiClickable, { type UiClickableProps } from '~/components/ui/Clickable.vue'

export interface UiButtonProps extends UiClickableProps {
	color?: 'primary' | 'secondary'
	size?: 'base' | 'sm'
}

const props = withDefaults(defineProps<UiButtonProps>(), { size: 'base' })

const classes = computed(() => {
	const list: string[] = []

	props.color && list.push(`ui-btn--${props.color}`)
	props.size && list.push(`ui-btn--${props.size}`)

	return list
})

</script>

<style>

@layer modifications {
	.ui-btn--primary {
		color: var(--color-white);
		background-color: var(--color-black);

		&:where(html.dark &) {
			color: var(--color-black);
			background-color: var(--color-white);
		}
	}

	.ui-btn--secondary {
		color: var(--color-black);
		background-color: var(--color-gray-50);
		transition: .15s ease;
		transition-property: background-color;

		&:hover {
			background-color: var(--color-gray-100);
		}

		&:where(html.dark &) {
			color: var(--color-gray-150);
			background-color: var(--color-gray-850);
			transition-property: background-color, color;

			&:hover {
				color: var(--color-white);
				background-color: var(--color-gray-800);
			}
		}
	}

	.ui-btn--base {
		height: 40px;
		padding: 0 20px;
		border-radius: 8px;
	}

	.ui-btn--sm {
		height: 32px;
		padding: 0 14px;
		border-radius: 6px;
		font-size: var(--text-sm);
	}
}

</style>

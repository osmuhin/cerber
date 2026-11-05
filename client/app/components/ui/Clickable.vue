<template>
	<component
		class="ui-clickable"
		:class="{ disabled }"
		:is="component"
		@mouseup="opacityTransition = true"
		@transitionend="opacityTransition = false"
		:style="{ transition: opacityTransition ? `opacity ${duration}ms ease` : null }"
		v-bind="nuxtLink"
	>
		<slot></slot>
	</component>
</template>

<script setup lang="ts">

import type { NuxtLinkProps } from '#app'
import { computed, ref } from '#imports'
import { NuxtLink } from '#components'

export interface UiClickableProps {
	tag?: string
	duration?: number
	nuxtLink?: NuxtLinkProps
	disabled?: boolean
}

const props = withDefaults(defineProps<UiClickableProps>(), {
	tag: 'button',
	duration: 200,
	disabled: false
})

const opacityTransition = ref(false)

const component = computed(() => {
	if (props.disabled) {
		return 'div'
	}

	return props.nuxtLink ? NuxtLink : props.tag
})

</script>

<style>

@layer components {
	.ui-clickable {
		user-select: none;

		&:not(.disabled) {
			cursor: pointer;

			&:active:not(.disabled) {
				opacity: .7 !important;
				transition: none !important;
			}
		}
	}
}

</style>

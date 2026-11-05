<template>
	<div class="w-full">
		<slot name="before" :id="id"></slot>
		<UiLabel v-if="label" class="mb-1.5" :for="id">{{ label }}</UiLabel>
		<div class="relative" v-if="validationField">
			<input
				:class="classes"
				:id="id"
				type="text"
				autocomplete="off"
				v-model="model"
				v-on:[validationTouchEvent]="validationField && validationField.touch()"
				v-bind="useAttrs()"
			/>
			<div class="absolute inset-0 pointer-events-none">
				<transition>
					<div class="ui-input__exclamation-mark-icon absolute right-0 inset-y-0 flex items-center px-2" v-if="validationField.hasErrors()">
						<IconExclamationMark class="text-red-500 w-5 h-5" />
					</div>
				</transition>
			</div>
		</div>
		<input
			v-else
			:class="classes"
			:id="id"
			type="text"
			autocomplete="off"
			v-model="model"
			v-bind="useAttrs()"
		/>
		<UiValidationError class="mt-1" v-if="validationField" :show="validationField.hasErrors()">
			{{ validationField.getError() }}
		</UiValidationError>
		<slot name="after" :id="id"></slot>
	</div>
</template>

<script setup lang="ts">

import type { FieldContext } from '~/composables/use-validation'
import { computed, getCurrentInstance, useAttrs, useId } from 'vue'
import IconExclamationMark from '~/assets/svg/Monochrome=exclamationmark.circle.fill.svg'
import UiLabel from './Label.vue'
import UiValidationError from './ValidationError.vue'

export interface InputProps {
	invalid?: boolean
	label?: string
	nonStyled?: boolean
	size?: 'base' | null
	validationField?: FieldContext<any>
	validationTouchEvent?: string,
	disabled?: boolean
}

const instance = getCurrentInstance()

defineOptions({ inheritAttrs: false })

const id = useId()

const props = withDefaults(defineProps<InputProps>(), {
	invalid: false,
	nonStyled: false,
	size: 'base',
	validationTouchEvent: 'change',
	disabled: false
})

const model = defineModel({
	set(value) {
		if (props.validationField) {
			props.validationField.setValue(value)
		}

		return value
	},
	get(value) {
		return props.validationField ? props.validationField.getValue() : value
	}
})

const classes = computed(() => {
	if (props.nonStyled) {
		return 'ui-input--non-styled'
	}

	const list = ['ui-input']

	props.size && list.push(`ui-input--${props.size}`)
	props.disabled && list.push(`ui-input--disabled`)

	if (props.invalid || props.validationField?.hasErrors()) {
		list.push(`ui-input--invalid`)
	}

	if (instance && 'class' in instance.attrs) {
		list.push(...(instance.attrs.class as string).replace(/\s+/ig, ' ').split(' '))
	}

	return list
})

</script>

<style>

@layer components {
	.ui-input--non-styled, .ui-input {
		width: 100%;
		appearance: none;
		background-image: none;
		border-radius: 0;
		border-width: 0;
		color: inherit;
		font-family: inherit;
		font-size: 1rem;
		font-weight: inherit;
		letter-spacing: inherit;
		line-height: inherit;
		margin: 0;
		padding: 0;

		&:focus {
			outline: none;
		}
	}

	.ui-input {
		border-radius: 8px;
		border: 1px solid var(--color-gray-300);
		display: block;
		transition-duration: .15s;
		transition-timing-function: ease;
		transition-property: border-color, background-color;
		width: 100%;

		&:focus {
			border-color: #000;
		}
	}

	html.dark .ui-input {
		border: 1px solid var(--color-gray-700);
		background-color: transparent;

		&:focus {
			border-color: color-mix(in oklab, #fff 50%, transparent);
		}
	}

	.ui-input__exclamation-mark-icon {
		&.v-enter-active, &.v-leave-active {
			transition: opacity .25s ease;
		}

		&.v-enter-from, &.v-leave-to {
			opacity: 0;
		}
	}
}

@layer modifications {
	.ui-input--base {
		height: 36px;
		padding: 0 12px;
	}

	.ui-input--invalid {
		background-color: color-mix(in oklab, #ef4444 10%, transparent);
		border-color: color-mix(in oklab, #ef4444 50%, transparent);

		&:focus {
			border-color: #ef4444;
		}

		&:not(.ui-textarea--invalid) {
			padding-right: 32px;
		}
	}

	.ui-input--disabled {

	}
}

</style>

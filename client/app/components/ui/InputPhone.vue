<template>
	<UiInput
		v-model="model"
		type="tel"
	/>
</template>

<script setup lang="ts">

import UiInput from './Input.vue'
import { AsYouType, formatIncompletePhoneNumber } from 'libphonenumber-js'

const asYouType = new AsYouType('RU')

const model = defineModel<string>({
	set(value) {
		asYouType.reset()

		asYouType.input(value)

		return asYouType.getNumber() ? asYouType.getNumber()?.number : value
	},
	get(value) {
		return formatIncompletePhoneNumber(value)
	}
})

</script>

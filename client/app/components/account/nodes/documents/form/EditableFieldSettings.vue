<template>
	<div class="popover bg-white dark:bg-gray-950 absolute top-5 left-0 rounded-2xl mt-2">
		<div class="popover-inner-content relative z-20 p-5 pb-7">
			<h4 class="text-lg font-medium">Свойства поля</h4>
			<div class="mt-6">
				<UiInput v-model.lazy="model.label" label="Этикетка" />
			</div>
			<div class="mt-4">
				<UiTextarea class="mt-1" :rows="1" allow-shrink v-model="shortDescription" label="Короткое описание" />
			</div>
			<div class="mt-6 space-y-6">
				<div>
					<div class="flex items-center justify-between">
						<div class="flex items-center space-x-2">
							<div class="flex items-center justify-center w-6 h-6 rounded-[5px] -bg-gradient-to-b bg-black dark:bg-white from-green-500 to-green-600">
								<LockIcon class="w-2.5 text-white dark:text-black" />
							</div>
							<div class="tracking-wide">Защищенное</div>
						</div>
						<UiSwitch v-model="model.isSecure" />
					</div>
					<p class="text-xs mt-1.5 text-gray-600 leading-tight">
						Значение поля будет храниться в зашифрованном виде, поиск по нему осуществляться не будет, при отображении визуально будет скрываться.
					</p>
				</div>
				<div>
					<div class="flex items-center justify-between">
						<div class="flex items-center space-x-2">
							<div class="flex items-center justify-center w-6 h-6 rounded-[5px] -bg-gradient-to-b bg-black dark:bg-white from-blue-500 to-blue-600">
								<icon class="text-white dark:text-black" name="material-symbols:wrap-text-rounded" size="20px" />
							</div>
							<div class="tracking-wide">Многострочное</div>
						</div>
						<UiSwitch v-model="model.isMultiline" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import UiInput from '~/components/ui/Input.vue'
import UiTextarea from '~/components/ui/Textarea.vue'
import UiSwitch from '~/components/ui/Switch.vue'
import LockIcon from '~/assets/svg/lock.svg'
import { computed } from 'vue'
import type { DocumentField, NewDocumentField } from '~/repositories/adapters/node-adapter'

const model = defineModel<DocumentField | NewDocumentField>({ required: true })

const shortDescription = computed({
	get: () => model.value.shortDescription || '',
	set: v => model.value.shortDescription = v || null
})

</script>

<style scoped lang="scss">

.popover {
	width: 380px;
	box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.1);
	z-index: 20;

	&.v-enter-active {
		transform-origin: top left;
		transition: opacity .3s ease, transform .35s cubic-bezier(.25,.1,.25,1.45);

		.popover-inner-content {
			transition: opacity .2s ease .2s;
		}
	}

	&.v-leave-active {
		transition: opacity .2s ease;
		pointer-events: none;
	}

	&.v-enter-from {
		opacity: 0;
		transform: scale(.7);

		.popover-inner-content {
			opacity: 0;
		}
	}

	&.v-leave-to {
		opacity: 0;
	}
}

</style>

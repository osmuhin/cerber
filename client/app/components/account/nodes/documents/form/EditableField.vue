<template>
	<div>
		<div class="relative">
			<transition :duration="500">
				<EditableFieldSettings
					class="z-20"
					v-if="showPopover"
					v-click-outside="() => showPopover = false"
					v-model="model"
				/>
			</transition>
			<component :is="model.isMultiline ? UiTextarea : UiInput" v-model="model.value">
				<template #before="{ id }">
					<div class="flex items-end mb-1.5">
						<div class="flex items-center gap-1.5">
							<UiClickable
								class="flex items-center justify-center w-[22px] h-[22px] rounded-[5px] bg-gray-50 hover:bg-gray-100 dark:bg-gray-850 dark:hover:bg-gray-800 text-red-500"
								title="Удалить поле"
								@click="emit('remove')"
							>
								<icon name="material-symbols:close-rounded" size="18px" />
							</UiClickable>
							<UiClickable
								class="flex items-center justify-center w-[22px] h-[22px] rounded-[5px] bg-gray-50 hover:bg-gray-100 dark:bg-gray-850 dark:hover:bg-gray-800"
								title="Изменить свойства поля"
								@click="showPopover = true"
							>
								<PencilIcon class="w-3" />
							</UiClickable>
							<UiLabel :for="id">{{ model.label }}</UiLabel>
							<LockIcon class="ml-1 w-2 text-gray-600" v-if="model.isSecure" />
						</div>
						<div class="flex ml-auto">
							<UiClickable
								class="change-position-button flex items-center justify-center w-5 h-5 rounded-[5px] text-gray-600 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-850 hover:text-black dark:hover:text-gray-200"
								:class="{ disabled: first }"
								title="Передвинуть наверх"
								@click="emit('up')"
							>
								<icon name="material-symbols:keyboard-arrow-up-rounded" size="20px" />
							</UiClickable>
							<UiClickable
								class="change-position-button flex items-center justify-center w-5 h-5 rounded-[5px] text-gray-600 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-850 hover:text-black dark:hover:text-gray-200"
								:class="{ disabled: last }"
								title="Передвинуть вниз"
								@click="emit('down')"
							>
								<icon name="material-symbols:keyboard-arrow-down-rounded" size="20px" />
							</UiClickable>
						</div>
					</div>
				</template>
			</component>

			<div class="absolute top-0 right-0 flex items-center mt-7 pr-1.5 pt-1.5 z-10">
				<UiClickable
					class="generate-btn backdrop-blur-xs w-6 h-6 flex items-center justify-center rounded-md text-gray-600 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-850 hover:text-black dark:hover:text-gray-200"
					title="Сгенерировать"
					tabindex="-1"
				>
					<icon name="material-symbols:magic-button" />
				</UiClickable>
			</div>
		</div>
		<p class="text-xs mt-1 tracking-wide text-gray-500 leading-snug" v-if="model.shortDescription">
			{{ model.shortDescription }}
		</p>
	</div>
</template>

<script setup lang="ts">

import UiInput from '~/components/ui/Input.vue'
import UiTextarea from '~/components/ui/Textarea.vue'
import UiLabel from '~/components/ui/Label.vue'
import UiClickable from '~/components/ui/Clickable.vue'
import LockIcon from '~/assets/svg/lock.svg'
import PencilIcon from '~/assets/svg/Monochrome=applepencil.gen1.svg'
import EditableFieldSettings from '~/components/account/nodes/documents/form/EditableFieldSettings.vue'
import { ref } from 'vue'
import type { NewDocumentField, DocumentField } from '~/repositories/adapters/node-adapter'

const emit = defineEmits<{
	(e: 'remove'): void
	(e: 'up'): void
	(e: 'down'): void
}>()

defineProps<{ first: boolean, last: boolean }>()

const model = defineModel<DocumentField | NewDocumentField>({ required: true })

const showPopover = ref(false)

</script>

<style lang="scss" scoped>

.change-position-button {
	&:not(.disabled):hover {
		color: #000;
	}

	&.disabled {
		pointer-events: none;
		color: rgba(#000, .15);
	}
}

html.dark {
	.change-position-button {
		&:not(.disabled):hover {
			color: #fff;
		}

		&.disabled {
			color: rgba(#fff, .15);
		}
	}
}

</style>

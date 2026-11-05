<template>
	<div>
		<div>
			<div>
				<UiInput v-model="model.name" label="Название" />
			</div>
			<div class="mt-2">
				<HeightAnimation>
					<TransitionGroup
						class="w-full relative"
						tag="div"
						name="field-list"
					>
						<EditableField
							class="mt-5"
							v-for="(field, idx) in model.fields"
							:key="field.clientCode"
							v-model="model.fields[idx]"
							:first="idx === 0"
							:last="idx === model.fields.length - 1"
							@remove="model.fields.splice(idx, 1)"
							@up="swapFields(idx, -1)"
							@down="swapFields(idx, 1)"
						/>
					</TransitionGroup>
				</HeightAnimation>

				<div class="mt-5">
					<UiButton class="gap-1" color="secondary" size="sm" tabindex="-1" @click="addField">
						<icon class="-ml-1" name="material-symbols:add-rounded" size="18px" />
						<span>Добавить поле</span>
					</UiButton>
				</div>
			</div>
		</div>

		<div class="mt-7 relative z-10">
			<UiTextarea v-model="model.notes" label="Заметки" />
		</div>
	</div>
</template>

<script setup lang="ts">

import type { NewDocument } from '~/repositories/adapters/node-adapter'
import UiInput from '~/components/ui/Input.vue'
import UiTextarea from '~/components/ui/Textarea.vue'
import UiButton from '~/components/ui/Button.vue'
import EditableField from '~/components/account/nodes/documents/form/EditableField.vue'
import HeightAnimation from '~/components/ui/HeightAnimation.vue'
import { uid } from '~/utils/helpers'

const model = defineModel<NewDocument>({ required: true })

let fieldsCount = model.value.fields.length

const addField = () => model.value.fields.push({
	label: `Поле #${++fieldsCount}`,
	isSecure: false,
	isMultiline: false,
	value: '',
	shortDescription: null,
	clientCode: uid(),
	sort: 0
})

const swapFields = (idx: number, direction: -1 | 1) => {
	const tmp = model.value.fields[idx]
	model.value.fields[idx] = model.value.fields[idx + direction]
	model.value.fields[idx + direction] = tmp
}

</script>

<style lang="scss" scoped>

.field-list-move,
.field-list-enter-active {
	transition: transform .3s ease, opacity .3s ease;
	background-color: #fff;
}

html.dark {
	.field-list-move,
	.field-list-enter-active {
		background-color: transparent;
		backdrop-filter: blur(20px);
	}
}

.field-list-leave-active {
	position: absolute;
	width: 100%;
	transition: transform .3s ease, opacity .3s ease;
}

.field-list-enter-from,
.field-list-leave-to {
	opacity: 0;
	transform: scale(.8);
}

</style>

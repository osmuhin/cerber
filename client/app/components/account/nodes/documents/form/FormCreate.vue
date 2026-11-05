<template>
	<div>
		<div class="flex items-center space-x-3">
			<h2 class="font-bold text-gray-850 dark:text-gray-200 text-xl tracking-wide">Новый доступ</h2>
		</div>

		<TheForm class="mt-6" v-model="model" />

		<div class="flex justify-end mt-6">
			<UiButton @click="emit('cancel')">Отменить</UiButton>
			<UiButton color="primary">Создать</UiButton>
		</div>
	</div>
</template>

<script setup lang="ts">

import type { NewDocument } from '~/repositories/adapters/node-adapter'
import UiButton from '~/components/ui/Button.vue'
import TheForm from './Form.vue'
import { uid } from '~/utils/helpers'
import { ref } from 'vue'
import { createNode } from '~/repositories/nodes'

const emit = defineEmits<{
	(e: 'cancel'): void
}>()

const model = ref<NewDocument>({
	type: 'document',
	notes: '',
	clientCode: uid(),
	name: '',
	fields: []
})

const pending = ref(false)

const save = async () => {
	pending.value = true
	await createNode(model.value)
	pending.value = false
}

</script>

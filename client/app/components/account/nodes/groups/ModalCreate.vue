<template>
	<UiModal v-model="show">
		<div class="space-y-4 min-w-72">
			<h2 class="text-lg font-medium">Новая группа</h2>
			<p class="text-sm text-gray-500">Создание групп пока в разработке.</p>
			<UiButton class="w-full" @click="show = false">Закрыть</UiButton>
		</div>
	</UiModal>
</template>

<script setup lang="ts">

import UiModal from '~/components/ui/Modal.vue'
import UiButton from '~/components/ui/Button.vue'

defineProps<{ parentId: number | null }>()

const show = defineModel<boolean>({ required: true })

</script>

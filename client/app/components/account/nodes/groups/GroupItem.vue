<template>
	<UiPressNHold @hold="onHold">
		<UiClickable
			class="secret-group w-full flex items-center gap-3 h-10 px-4 rounded-lg"
			:class="{ 'edit-mode': group.editMode }"
			:nuxt-link="link"
			:disabled="group.editMode"
			tag="div"
		>
			<icon class="text-gray-800 dark:text-gray-200 shrink-0" name="material-symbols:folder-rounded" size="30px" />
			<div class="w-full inline-group-input" v-if="group.editMode">
				<UiInput
					class="editable-group-input bg-gray-50 dark:bg-gray-850 h-8 px-2 rounded-lg -mx-2 font-medium"
					v-model="newName"
					non-styled
					@blur="onBlur"
					@focus="onFocus"
					@vue:mounted="inputMounted"
				/>
			</div>
			<span class="font-medium" v-else>{{ group.name }}</span>
		</UiClickable>
	</UiPressNHold>
</template>

<script setup lang="ts">

import { computed, ref, type VNode } from 'vue'
import UiClickable from '~/components/ui/Clickable.vue'
import UiInput from '~/components/ui/Input.vue'
import UiPressNHold from '~/components/ui/PressNHold.vue'

type Group = App.Nodes.Group | App.Nodes.NewGroup

const props = defineProps<{ group: Group }>()
const emit = defineEmits<{
	(e: 'saveName', group: Group, name: string): void
}>()

const newName = ref<string>(props.group.name)

const onHold = () => props.group.editMode = true

const link = computed(() => {
	return 'id' in props.group ? {
		to: { name: 'group-alias', params: { alias: props.group.alias } }
	} : void 0
})

let timeout: NodeJS.Timeout | null = null

const onFocus = () => timeout && clearTimeout(timeout)

const onBlur = () => {
	// Если пользователь переключает язык, то на долю секунды фокус с поля может сняться, что нежелательно
	timeout = setTimeout(() => saveNewName(), 300)
}

const saveNewName = () => {
	timeout && clearTimeout(timeout)

	if ('id' in props.group) {
		if (!newName.value.length || newName.value === props.group.name) {
			return
		}
	}

	emit(
		'saveName',
		props.group,
		newName.value.length ? newName.value : props.group.name,
	)
}

const inputMounted = (vnode: VNode) => {
	if (!vnode.el) {
		return
	}

	const $input = vnode.el.querySelector('.editable-group-input')

	if ($input) {
		$input.focus()
		$input.select()
	} else {
		console.warn('Element .editable-group-input cannot be found')
	}
}

</script>

<style lang="scss" scoped>

.secret-group:not(.edit-mode) {
	&:hover {
		background-color: var(--color-gray-50);
	}
}

html.dark {
	.secret-group:not(.edit-mode) {
		&:hover {
			background-color: var(--color-gray-850);
		}
	}
}

</style>

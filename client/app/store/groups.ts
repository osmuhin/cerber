import { defineStore } from 'pinia'
import { useNodesStore } from './nodes'
import { computed, ref } from 'vue'
import { uid } from '~/utils/helpers'

export const useGroupsStore = defineStore('groups', () => {
	const nodesStore = useNodesStore()
	const currentGroupId = ref<number|null>(null)

	const groups = computed(() => {
		return nodesStore.nodes.filter(d => d.type === 'group') as (App.Nodes.Group | App.Nodes.NewGroup)[]
	})

	const currentGroup = computed(() => {
		if (currentGroupId.value) {
			return nodesStore.nodes.find(n => 'id' in n && n.id === currentGroupId.value)
		}

		return null
	})

	const jumpToGroup = (groupAlias: string|null) => {

	}

	const create = () => nodesStore.add({
		name: 'Новая группа',
		type: 'group',
		notes: null,
		clientCode: uid(),
		editMode: true,
		parentId: currentGroupId.value
	})

	const update = async (group: App.Nodes.Group | App.Nodes.NewGroup) => {
		nodesStore.change(group)
		await nodesStore.sync()
	}

	return {
		groups, currentGroup,
		create, update
	}
})

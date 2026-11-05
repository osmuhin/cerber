import { defineStore } from 'pinia'
import { createNodesBatch, getRootNodes, updateNodesBatch } from '~/repositories/nodes'
import { computed, ref } from 'vue'

export const useNodesStore = defineStore('nodes', () => {
	const nodes = ref<(App.Nodes.Node | App.Nodes.NewNode)[]>([])

	// const documents = computed(() => {
	// 	return nodes.value.filter(n => n.type === 'document') as (Document | NewDocument)[]
	// })

	const fetchRootNodes = async () => {
		nodes.value = await getRootNodes()
	}

	const create = async (nodesForCreate: App.Nodes.NewNode[]) => {
		const createdNodes = await createNodesBatch(nodesForCreate)

		nodes.value = nodes.value.map(n => {
			if ('clientCode' in n) {
				const createdNode = createdNodes.find(cN => cN.clientCode === n.clientCode)

				if (createdNode) {
					return createdNode
				}
			}

			return n
		})
	}

	const add = (newNode: App.Nodes.NewNode) => {
		nodes.value.unshift(newNode)
	}

	const update = async (nodesForUpdate: App.Nodes.Node[]) => {
		await updateNodesBatch(nodesForUpdate)

		nodes.value = nodes.value.map(n => {
			if ('id' in n && n.changedOnClient) {
				const updatedNode = nodesForUpdate.find(uN => uN.id === n.id)

				if (updatedNode) {
					updatedNode.changedOnClient = false

					return updatedNode
				}
			}

			return n
		})
	}

	const change = (nodeForChange: App.Nodes.Node | App.Nodes.NewNode) => {
		if ('id' in nodeForChange) {
			nodeForChange.changedOnClient = true
		}

		nodes.value = nodes.value.map(n => {
			if ('id' in n && 'id' in nodeForChange) {
				return nodeForChange.id === n.id ? nodeForChange : n
			}

			if ('clientCode' in n && 'clientCode' in nodeForChange) {
				return nodeForChange.clientCode === n.clientCode ? nodeForChange : n
			}

			return n
		})
	}

	const sync = async () => {
		const nodesForCreate: App.Nodes.NewNode[] = []
		const nodesForUpdate: App.Nodes.Node[] = []

		nodes.value.forEach(n => {
			if ('id' in n && n.changedOnClient) {
				nodesForUpdate.push(n)
			}

			if (!('id' in n)) {
				nodesForCreate.push(n)
			}
		})

		nodesForCreate.length && await create(nodesForCreate)
		nodesForUpdate.length && await update(nodesForUpdate)
	}

	return {
		nodes: computed(() => nodes.value),
		fetchRootNodes, add, create, change, update, sync
	}
})

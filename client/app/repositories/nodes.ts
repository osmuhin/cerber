import { useGetReq, usePostReq, usePutReq } from '#imports'
import { auth } from '~/utils/decorators/request/auth.decorator'
import { encrypt } from '~/utils/decorators/request/encryption.decorator'
import { transformCreatedNodeToClient, transformNewNodeToServer, transformNodeForUpdateToServer, transformNodeToClient } from './adapters/node-adapter'

export const createNode = async (newNode: App.Nodes.NewNode) => {
	const node = await usePostReq<App.Nodes.Server.Node>()
		.url('/nodes')
		.body(transformNewNodeToServer(newNode))
		.apply(auth, encrypt)
		.send()

	return transformNodeToClient(node)
}

export const createNodesBatch = async (newNodes: App.Nodes.NewNode[]) => {
	const newNodesForServer = newNodes.map(transformNewNodeToServer)

	const nodes = await usePostReq<App.Nodes.Server.CreatedNode[]>()
		.url('/nodes/batch')
		.body(newNodesForServer)
		.apply(auth, encrypt)
		.send()

	return nodes.map(transformCreatedNodeToClient)
}

export const updateNodesBatch = async (nodesForUpdate: App.Nodes.Node[]) => {
	const nodesToUpdateForServer = nodesForUpdate.map(transformNodeForUpdateToServer)

	await usePutReq('/nodes/batch')
		.body(nodesToUpdateForServer)
		.apply(auth, encrypt)
		.send()
}

export const getRootNodes = async () => {
	const nodes = await useGetReq<App.Nodes.Server.Node[]>()
		.url('/nodes')
		.apply(auth, encrypt)
		.send()

	return nodes.map(transformNodeToClient)
}

export const getNodes = async () => {
	const nodes = await useGetReq<App.Nodes.Server.Node[]>()
}

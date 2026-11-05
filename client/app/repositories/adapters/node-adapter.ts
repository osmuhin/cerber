export const transformNodeToClient = (node: App.Nodes.Server.Node): App.Nodes.Node => {
	return {
		id:              node.id,
		type:            node.type,
		alias:           node.alias,
		name:            node.name,
		notes:           node.notes,
		isEffective:     node.is_effective,
		changedOnClient: false,
		createdAt:       new Date(node.created_at * 1000),
		deletedAt:       node.deleted_at === null ? null : new Date(node.deleted_at * 1000)
	}
}

export const transformNodeForUpdateToServer = (node: App.Nodes.Node): App.Nodes.Server.NodeForUpdate => {
	return {
		id: node.id,
		name: node.name,
		notes: node.notes,
		is_effective: node.isEffective
	}
}

export const transformNewNodeToServer = (newNode: App.Nodes.NewNode): App.Nodes.Server.NewNode => {
	return {
		name:        newNode.name,
		notes:       newNode.notes,
		type:        newNode.type,
		client_code: newNode.clientCode
	}
}

export const transformGroupToClient = (group: App.Nodes.Server.Group): App.Nodes.Group => {
	return {
		...transformNodeToClient(group),
		type:     group.type,
		editMode: false
	}
}

export const transformNewDocumentToServer = (newDocument: App.Nodes.NewDocument): App.Nodes.Server.NewDocument => {
	return {
		...transformNewNodeToServer(newDocument),
		type:   newDocument.type,
		fields: newDocument.fields.map(transformNewDocumentFieldToServer)
	}
}

export const transformNewDocumentFieldToServer = (field: App.Nodes.NewDocumentField): App.Nodes.Server.NewDocumentField => {
	return {
		label:             field.label,
		short_description: field.shortDescription,
		value:             field.value,
		is_multiline:      field.isMultiline,
		is_secure:         field.isSecure,
		sort:              field.sort
	}
}

export const transformNewGroupToServer = (newGroup: App.Nodes.NewGroup): App.Nodes.Server.NewGroup => {
	return {
		...transformNewNodeToServer(newGroup),
		type: newGroup.type
	}
}

export const transformCreatedNodeToClient = (node: App.Nodes.Server.CreatedNode): App.Nodes.CreatedNode => {
	return {
		...transformNodeToClient(node),
		clientCode: node.client_code
	}
}

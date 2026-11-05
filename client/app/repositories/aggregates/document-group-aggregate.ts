import { useGetReq } from '~/composables/use-request'
import { auth } from '~/utils/decorators/request/auth.decorator'
import { encrypt } from '~/utils/decorators/request/encryption.decorator'

export const fetchDocumentGroupAggregate = async (parentGroup: { alias?: string|null, id?: number|null }) => {
	let query: { id?: number|null, alias?: string|null }

	if (typeof parentGroup.alias !== 'undefined') {
		query = { alias: parentGroup.alias }
	} else if (typeof parentGroup.id !== 'undefined') {
		query = { id: parentGroup.id }
	} else {
		throw new Error('Either "alias" or "id" must be passed in the "parentGroup" object.')
	}

	const aggregate = await useGetReq<ServerDocumentGroupAggregate>()
		.url('/aggregates/document-group')
		.query(query)
		.apply(auth, encrypt)
		.send()

	return transformDocumentGroupAggregateToClient(aggregate)
}

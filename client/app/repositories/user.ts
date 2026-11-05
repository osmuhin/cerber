import { serverToClientUser, type ServerUser } from './adapters/user-adapter'
import { useGetReq } from '~/composables/use-request'
import { auth } from '~/utils/decorators/request/auth.decorator'
import { encrypt } from '~/utils/decorators/request/encryption.decorator'
import { makeRequest } from '~/utils/request'

export const fetchUser = async () => {
	return serverToClientUser(
		await useGetReq<ServerUser>('/auth/user').apply(auth, encrypt).send()
	)
}

export const initEncryptionHandshake = (clientPublicKey: string) => {
	return makeRequest<{ id: string, server_public_key: string }>('/handshake', {
		method: 'POST',
		body: clientPublicKey
	}).setHeader('Content-Type', 'text/plain').send()
}

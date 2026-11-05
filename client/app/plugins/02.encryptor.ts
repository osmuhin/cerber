import { defineNuxtPlugin } from 'nuxt/app'
import { defineEncryptor, type Handshake } from '~/utils/encryptor'
import { useLocalStorage } from '#imports'

export default defineNuxtPlugin(async () => {
	const [ handshake ] = useLocalStorage<Handshake>('encryption-handshake')

	const encryptor = defineEncryptor(handshake)

	if (import.meta.client) {
		await encryptor.initHandshakeIfNeeded()
	}

	return {
		provide: { encryptor }
	}
})

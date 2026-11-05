import type { RequestDecorator } from '~/utils/request'
import { useNuxtApp } from '#app'
import { util as forgeUtil } from 'node-forge'
import { useConfig } from '#imports'

export const encrypt: RequestDecorator = request => {
	const { $encryptor } = useNuxtApp()

	if (useConfig('public.disableHttpEncryption')) {
		return request
	}

	const originalSend = request.send

	request.send = () => {
		const body = JSON.stringify(request.getOption('body'))

		if (body === undefined) {
			return originalSend()
		}

		const { payload, key } = $encryptor.encrypt(body)
		const encryptedKey = $encryptor.getRsaKeypair().publicKey.encrypt(key)

		request.setOption('body', forgeUtil.encode64(payload))

		request.setHeader('X-Encrypted', 1)
		request.setHeader('X-Key', forgeUtil.encode64(encryptedKey))

		return originalSend()
	}

	return request
}

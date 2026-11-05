import type { RequestDecorator } from '~/utils/request'
import { useNuxtApp } from '#app'
import { util as forgeUtil } from 'node-forge'
import { useConfig } from '#imports'

export const decrypt: RequestDecorator = request => {
	const { $encryptor } = useNuxtApp()

	request.onResponse(({ response }) => {
		const headers = response.headers

		if (!headers.get('X-Encrypted')) {
			return
		}

		const encryptedKey = headers.get('X-Key')

		if (!encryptedKey) {
			throw new Error('"X-Key" HTTP header required')
		}

		const key = $encryptor.getRsaKeypair().privateKey.decrypt(
			forgeUtil.decode64(encryptedKey)
		)

		const encryptedPayload = JSON.parse(
			forgeUtil.decode64(response._data)
		)

		response._data = $encryptor.decrypt(key, encryptedPayload)

		const contentType = headers.get('Content-Type')

		if (contentType && contentType === 'application/json') {
			response._data = JSON.parse(response._data)
		}

		if (useConfig('public.consoleLogDecryptedResponse')) {
			console.log(request._context.url, response._data)
		}
	})

	return request
}

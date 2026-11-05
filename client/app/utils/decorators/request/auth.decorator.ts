import type { RequestDecorator } from '~/utils/request'
import { useNuxtApp } from '#app'
import { defaults } from 'lodash-es'

type AuthDecoratorParameters = {
	provider?: Parameters<ReturnType<typeof useNuxtApp>['$resolveAuthProvider']>[0],
	ignoreErrors?: boolean
}

export const auth: RequestDecorator = (
	request,
	parameters?: AuthDecoratorParameters
) => {
	const context = defaults<unknown, Required<AuthDecoratorParameters>>(parameters, {
		provider: 'default',
		ignoreErrors: false
	})

	const provider = useNuxtApp().$resolveAuthProvider(context.provider)
	const originalSend = request.send

	request.send = async () => {
		const signingResult = await provider.sign(request)

		if (!signingResult && !context.ignoreErrors) {
			return new Promise((_, reject) => reject(null))
		}

		return originalSend()
	}

	return request
}

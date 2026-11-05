import { useRuntimeConfig } from '#app'
import { get } from 'lodash-es'
import yn from 'yn'

export const useConfig = (key: Parameters<typeof get>[1], recognizeBool = true) => {
	const config = useRuntimeConfig()
	const value = get(config, key)

	if (recognizeBool) {
		const bool = yn(value)

		return bool === undefined ? value : bool
	}

	return value
}

import type { Ref } from 'vue'
import type { AppRequest } from './request'
import { isJwtExpired } from './helpers'
import { issueTokensPairViaPasswordGrant, issueTokensPairViaRefreshToken, revokeSession } from '~/repositories/auth'
import { pick } from 'lodash-es'

export type JwtTokensPair = {
	access_token: string
	refresh_token: string
}

export interface AuthProvider {
	sign(request: AppRequest): Promise<boolean>
	canSign(): boolean
	signIn(login: string, password: string): Promise<unknown>
	logout(needRevoke?: boolean): void
	saveSignature(signature: JwtTokensPair): void
}

export const defineJwtPairAuthProvider = (pair: Ref<JwtTokensPair | null | undefined>, onLogin: () => void, onLogout: () => void) => {
	const saveSignature: AuthProvider['saveSignature'] = (signature: JwtTokensPair) => {
		pair.value = signature
	}

	const canSign: AuthProvider['canSign'] = () => !!pair.value

	const refreshTokensPair = async () => {
		try {
			const newPair = await issueTokensPairViaRefreshToken(
				(pair.value as JwtTokensPair).refresh_token
			)

			saveSignature(pick(newPair, ['access_token', 'refresh_token']))

			return true
		} catch (reason: any) {
			if (reason.data && reason.data.error_reason === 'auth_credentials_error') {
				logout(false)

				return false
			}

			console.error('Error occured while tokens pair issuing')

			throw reason
		}
	}

	const sign: AuthProvider['sign'] = async (request) => {
		if (!canSign()) {
			logout(false)

			return false
		}

		pair.value = pair.value as JwtTokensPair

		if (isJwtExpired(pair.value.access_token) && !(await refreshTokensPair())) {
			return false
		}

		request.setBearerToken(pair.value.access_token)

		return true
	}

	const logout: AuthProvider['logout'] = async (needRevoke = true) => {
		if (needRevoke) {
			const request = revokeSession()

			if (await sign(request)) {
				try { await request.send() } catch {}
			}
		}

		pair.value = null

		onLogout()
	}

	const signIn: AuthProvider['signIn'] = async (login: string, password: string) => {
		const response = await issueTokensPairViaPasswordGrant(login, password)

		saveSignature(pick(response, ['access_token', 'refresh_token']))

		onLogin()
	}

	const provider: AuthProvider = { sign, canSign, logout, saveSignature, signIn }

	return provider
}

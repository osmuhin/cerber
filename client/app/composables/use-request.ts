import type { Options } from '~/utils/request'
import type { NitroFetchRequest } from 'nitropack'
import { useNuxtApp } from '#app'

export const useGetReq = <
	DataT,
	RequestT extends NitroFetchRequest = NitroFetchRequest
>(request?: RequestT, options: Options<RequestT> = {}) => {
	return useNuxtApp().$makeRequest<DataT>(request, { method: 'GET', ...options })
}

export const usePostReq = <
	DataT,
	RequestT extends NitroFetchRequest = NitroFetchRequest
>(request?: RequestT, body = {}, options: Options<RequestT> = {}) => {
	return useNuxtApp().$makeRequest<DataT>(request, { method: 'POST', body, ...options })
}

export const usePutReq = <
	DataT,
	RequestT extends NitroFetchRequest = NitroFetchRequest
>(request?: RequestT, body = {}, options: Options<RequestT> = {}) => {
	return useNuxtApp().$makeRequest<DataT>(request, { method: 'PUT', body, ...options })
}

export const usePatchReq = <
	DataT,
	RequestT extends NitroFetchRequest = NitroFetchRequest
>(request?: RequestT, body = {}, options: Options<RequestT> = {}) => {
	return useNuxtApp().$makeRequest<DataT>(request, { method: 'PATCH', body, ...options })
}

export const useDeleteReq = <
	DataT,
	RequestT extends NitroFetchRequest = NitroFetchRequest
>(request?: RequestT, options: Options<RequestT> = {}) => {
	return useNuxtApp().$makeRequest<DataT>(request, { method: 'DELETE', ...options })
}

import type { FetchHooks } from 'ofetch'
import type { NitroFetchRequest, NitroFetchOptions } from 'nitropack'
import { apiBaseUrl } from '~/utils/helpers'
import { defaults } from 'lodash-es'

export type Options<RequestT extends NitroFetchRequest> = NitroFetchOptions<RequestT>

export type Interceptors = {
	onRequest: ElementType<Exclude<FetchHooks['onRequest'], undefined>>
	onRequestError: ElementType<Exclude<FetchHooks['onRequestError'], undefined>>
	onResponse: ElementType<Exclude<FetchHooks['onResponse'], undefined>>
	onResponseError: ElementType<Exclude<FetchHooks['onResponseError'], undefined>>
}

export type CallInterceptors = <RequestT extends NitroFetchRequest>(
	context: AppRequestContext<RequestT>,
	type: 'onRequest' | 'onResponse' | 'onRequestError' | 'onResponseError',
	ctx: any
) => Promise<void>

export type MakeContext = <RequestT extends NitroFetchRequest>(url?: RequestT, options?: Options<RequestT>) => AppRequestContext<RequestT>

export type AppRequest<
	DataT = unknown,
	RequestT extends NitroFetchRequest = NitroFetchRequest
> = {
	_context: AppRequestContext<RequestT>
	apply(...decorators: RequestDecorator[]): AppRequest<DataT, RequestT>
	url(url: RequestT): AppRequest<DataT, RequestT>
	query(query: Options<RequestT>['query']): AppRequest<DataT, RequestT>
	body(body: Options<RequestT>['body']): AppRequest<DataT, RequestT>
	setOption<K extends keyof Options<RequestT>>(name: K, value: Options<RequestT>[K]): AppRequest<DataT, RequestT>
	getOption<K extends keyof Options<RequestT>>(name: K): Options<RequestT>[K]
	setHeader(name: string, value: number | string | null): AppRequest<DataT, RequestT>
	getHeader(name: string): string | null
	setBearerToken(token: string): AppRequest<DataT, RequestT>
	onRequest(interceptor: Interceptors['onRequest']): AppRequest<DataT, RequestT>
	onResponse(interceptor: Interceptors['onResponse']): AppRequest<DataT, RequestT>
	onRequestError(interceptor: Interceptors['onRequestError']): AppRequest<DataT, RequestT>
	onResponseError(interceptor: Interceptors['onResponseError']): AppRequest<DataT, RequestT>
	send(): Promise<DataT>
}

export interface AppRequestContext<RequestT extends NitroFetchRequest> {
	interceptors: { [key in keyof Interceptors]: Interceptors[key][] }
	headers: Headers
	options: Options<RequestT>
	url?: RequestT
}

export type RequestDecorator = <RequestT extends AppRequest>(
	request: RequestT,
	parameters?: { [key: string]: unknown }
) => RequestT

/* ==================== */

export const makeRequest = <
	DataT = unknown,
	RequestT extends NitroFetchRequest = NitroFetchRequest
>(url?: RequestT, options?: Options<RequestT>) => {
	const context = makeContext(url, options)

	const request: AppRequest<DataT, RequestT> = {
		_context: context,
		apply(...decorators) {
			decorators.forEach(d => d(request))

			return request
		},
		url(url) {
			context.url = url

			return request
		},
		query(query) {
			context.options.query = query

			return request
		},
		body(body) {
			context.options.body = body

			return request
		},
		setOption(name, value) {
			value === void 0 ? delete context.options[name] : context.options[name] = value

			return request
		},
		getOption(name) {
			return context.options[name]
		},
		setHeader(name, value) {
			value === null ? context.headers.delete(name) : context.headers.set(name, value.toString())

			return request
		},
		getHeader(name) {
			return context.headers.get(name)
		},
		setBearerToken(token) {
			return request.setHeader('Authorization', `Bearer ${token}`)
		},
		onRequest(interceptor) {
			context.interceptors.onRequest.push(interceptor)

			return request
		},
		onResponse(interceptor) {
			context.interceptors.onResponse.push(interceptor)

			return request
		},
		onRequestError(interceptor) {
			context.interceptors.onRequestError.push(interceptor)

			return request
		},
		onResponseError(interceptor) {
			context.interceptors.onResponseError.push(interceptor)

			return request
		},
		send() {
			if (typeof context.url === 'undefined') {
				throw new Error('The URL is not defined for this request.')
			}

			return $fetch<DataT>(context.url, compileRequestOptions(context))
		}
	}

	return request
}

const makeContext: MakeContext = (url, options) => {
	const context = {
		interceptors: {
			onResponse: [],
			onRequest: [],
			onResponseError: [],
			onRequestError: [],
		},
		headers: new Headers(options?.headers),
		url,
		options: defaults(options, {
			baseURL: apiBaseUrl(),
			mode: 'cors'
		})
	}

	return context
}

const compileRequestOptions = <RequestT extends NitroFetchRequest>(context: AppRequestContext<RequestT>): Options<RequestT> => {
	const options = { ...context.options }

	options.headers = mergeHeaders(context.options.headers, context.headers)

	options.onRequest = ctx => callInterceptors<RequestT>(context, 'onRequest', ctx)
	options.onResponse = ctx => callInterceptors<RequestT>(context, 'onResponse', ctx)
	options.onRequestError = ctx => callInterceptors<RequestT>(context, 'onRequestError', ctx)
	options.onResponseError = ctx => callInterceptors<RequestT>(context, 'onResponseError', ctx)

	return options
}

const callInterceptors: CallInterceptors = (context, type, ctx) => {
	const promises: Promise<void>[] = []
	let cbList: any[] = []

	if (type in context.options) {
		const interceptors = context.options[type]

		cbList = cbList.concat(Array.isArray(interceptors) ? interceptors : [interceptors])
	}

	cbList
		.concat(context.interceptors[type])
		.forEach(cb => promises.push(Promise.resolve(cb(ctx))))

	return Promise.all(promises) as unknown as Promise<void>
}

const mergeHeaders = (src1?: HeadersInit, src2?: HeadersInit) => {
	const result = new Headers(src1)

	new Headers(src2).forEach((value, name) => result.set(name, value))

	return result
}

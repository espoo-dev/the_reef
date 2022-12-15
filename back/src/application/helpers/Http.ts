export type HttpResponse<T = any> = {
	statusCode: number
	data: T
}

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: {
		message: error.message,
		name: error.name,
		stack: error.stack
	}
})

export const ok = <T = any> (data: T): HttpResponse<T> => ({
  statusCode: 200,
  data
})

export const created = (): HttpResponse => ({
  statusCode: 200,
  data: null
})

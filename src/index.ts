import { createCors, error, json, type RequestLike, Router, withParams } from 'itty-router'

const router = Router({ base: '/.well-known/matrix' }) // no "new", as this is not a real class

const { preflight, corsify } = createCors({
  origins: ['*'],
  methods: ['GET']
})

export interface Env {
  MATRIX_SERVER_ADDR: string
}

const missing = (message = 'Not found.'): Response => error(404, message)

router
  .options('*', preflight) // handle CORS OPTIONS requests
// withParams can now be used globally
  .all('*', withParams)
  .get('/client',
    (request: RequestLike, env: Env, context: ExecutionContext) =>
      ({ 'm.homeserver': { base_url: 'https://' + env.MATRIX_SERVER_ADDR } }))
  .get('/server',
    (request: RequestLike, env: Env, context: ExecutionContext) =>
      ({ 'm.server': env.MATRIX_SERVER_ADDR }))
// 404 for all else
  .all('*', () => missing('Are you sure about that?')) // 404 for all else

export default {
  // fetch: router.handle,
  fetch: async (request: RequestLike, env: Env, context: ExecutionContext) => await router
    .handle(request, env, context)
    .then(json) // if sent raw data, wrap it in a Response
    .catch((err) => error(500, err.stack))
    .then(corsify)
}

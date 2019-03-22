import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export ExampleEndpoint, { schema } from './model'

const router = new Router()
const { user, title, message, likes } = schema.tree

/**
 * @api {post} /example-endpoints Create example endpoint
 * @apiName CreateExampleEndpoint
 * @apiGroup ExampleEndpoint
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam user Example endpoint's user.
 * @apiParam title Example endpoint's title.
 * @apiParam message Example endpoint's message.
 * @apiParam likes Example endpoint's likes.
 * @apiSuccess {Object} exampleEndpoint Example endpoint's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Example endpoint not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ user, title, message, likes }),
  create)

/**
 * @api {get} /example-endpoints Retrieve example endpoints
 * @apiName RetrieveExampleEndpoints
 * @apiGroup ExampleEndpoint
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} exampleEndpoints List of example endpoints.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /example-endpoints/:id Retrieve example endpoint
 * @apiName RetrieveExampleEndpoint
 * @apiGroup ExampleEndpoint
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} exampleEndpoint Example endpoint's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Example endpoint not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /example-endpoints/:id Update example endpoint
 * @apiName UpdateExampleEndpoint
 * @apiGroup ExampleEndpoint
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam user Example endpoint's user.
 * @apiParam title Example endpoint's title.
 * @apiParam message Example endpoint's message.
 * @apiParam likes Example endpoint's likes.
 * @apiSuccess {Object} exampleEndpoint Example endpoint's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Example endpoint not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ user, title, message, likes }),
  update)

/**
 * @api {delete} /example-endpoints/:id Delete example endpoint
 * @apiName DeleteExampleEndpoint
 * @apiGroup ExampleEndpoint
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Example endpoint not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router

import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export AbuseCategory, { schema } from './model'

const router = new Router()
const { title } = schema.tree

/**
 * @api {post} /abuse-categories Create abuse category
 * @apiName CreateAbuseCategory
 * @apiGroup AbuseCategory
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title Abuse category's title.
 * @apiSuccess {Object} abuseCategory Abuse category's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Abuse category not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ title }),
  create)

/**
 * @api {get} /abuse-categories Retrieve abuse categories
 * @apiName RetrieveAbuseCategories
 * @apiGroup AbuseCategory
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} abuseCategories List of abuse categories.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /abuse-categories/:id Retrieve abuse category
 * @apiName RetrieveAbuseCategory
 * @apiGroup AbuseCategory
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} abuseCategory Abuse category's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Abuse category not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /abuse-categories/:id Update abuse category
 * @apiName UpdateAbuseCategory
 * @apiGroup AbuseCategory
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title Abuse category's title.
 * @apiSuccess {Object} abuseCategory Abuse category's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Abuse category not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ title }),
  update)

/**
 * @api {delete} /abuse-categories/:id Delete abuse category
 * @apiName DeleteAbuseCategory
 * @apiGroup AbuseCategory
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Abuse category not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router

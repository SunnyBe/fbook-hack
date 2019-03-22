import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Comment, { schema } from './model'

const router = new Router()
const { report, message, isVisible } = schema.tree

/**
 * @api {post} /comments Create comment
 * @apiName CreateComment
 * @apiGroup Comment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam report Comment's report.
 * @apiParam message Comment's message.
 * @apiParam isVisible Comment's isVisible.
 * @apiSuccess {Object} comment Comment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Comment not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ report, message, isVisible }),
  create)

/**
 * @api {get} /comments Retrieve comments
 * @apiName RetrieveComments
 * @apiGroup Comment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} comments List of comments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /comments/:id Retrieve comment
 * @apiName RetrieveComment
 * @apiGroup Comment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} comment Comment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Comment not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /comments/:id Update comment
 * @apiName UpdateComment
 * @apiGroup Comment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam report Comment's report.
 * @apiParam message Comment's message.
 * @apiParam isVisible Comment's isVisible.
 * @apiSuccess {Object} comment Comment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Comment not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ report, message, isVisible }),
  update)

/**
 * @api {delete} /comments/:id Delete comment
 * @apiName DeleteComment
 * @apiGroup Comment
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Comment not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router

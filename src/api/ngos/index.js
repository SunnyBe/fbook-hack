import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Ngos, { schema } from './model'

const router = new Router()
const { cacNumber, isVerified } = schema.tree

/**
 * @api {post} /ngos Create ngos
 * @apiName CreateNgos
 * @apiGroup Ngos
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam cacNumber Ngos's cacNumber.
 * @apiParam isVerified Ngos's isVerified.
 * @apiSuccess {Object} ngos Ngos's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ngos not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ cacNumber, isVerified }),
  create)

/**
 * @api {get} /ngos Retrieve ngos
 * @apiName RetrieveNgos
 * @apiGroup Ngos
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} ngos List of ngos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /ngos/:id Retrieve ngos
 * @apiName RetrieveNgos
 * @apiGroup Ngos
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} ngos Ngos's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ngos not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /ngos/:id Update ngos
 * @apiName UpdateNgos
 * @apiGroup Ngos
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam cacNumber Ngos's cacNumber.
 * @apiParam isVerified Ngos's isVerified.
 * @apiSuccess {Object} ngos Ngos's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ngos not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ cacNumber, isVerified }),
  update)

/**
 * @api {delete} /ngos/:id Delete ngos
 * @apiName DeleteNgos
 * @apiGroup Ngos
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Ngos not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router

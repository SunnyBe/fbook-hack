import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Report, { schema } from './model'

const router = new Router()
const { assignedTo, title, message, category, views, isAnonymous, isPrivate, contactMethod, victim } = schema.tree

/**
 * @api {post} /reports Create report
 * @apiName CreateReport
 * @apiGroup Report
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam assignedTo Report's assignedTo.
 * @apiParam title Report's title.
 * @apiParam message Report's message.
 * @apiParam category Report's category.
 * @apiParam views Report's views.
 * @apiParam isAnonymous Report's isAnonymous.
 * @apiParam isPrivate Report's isPrivate.
 * @apiSuccess {Object} report Report's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Report not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ assignedTo, title, message, category, views, isAnonymous, isPrivate, contactMethod, victim }),
  create)

/**
 * @api {get} /reports Retrieve reports
 * @apiName RetrieveReports
 * @apiGroup Report
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} reports List of reports.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /reports/:id Retrieve report
 * @apiName RetrieveReport
 * @apiGroup Report
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} report Report's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Report not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /reports/:id Update report
 * @apiName UpdateReport
 * @apiGroup Report
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam assignedTo Report's assignedTo.
 * @apiParam title Report's title.
 * @apiParam message Report's message.
 * @apiParam category Report's category.
 * @apiParam views Report's views.
 * @apiParam isAnonymous Report's isAnonymous.
 * @apiParam isPrivate Report's isPrivate.
 * @apiSuccess {Object} report Report's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Report not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ assignedTo, title, message, category, views, isAnonymous, isPrivate, contactMethod, victim }),
  update)

/**
 * @api {delete} /reports/:id Delete report
 * @apiName DeleteReport
 * @apiGroup Report
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Report not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router

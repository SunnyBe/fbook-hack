import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Ngos } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Ngos.create({ ...body, user })
    .then((ngos) => ngos.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Ngos.find(query, select, cursor)
    .populate('user')
    .then((ngos) => ngos.map((ngos) => ngos.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Ngos.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((ngos) => ngos ? ngos.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Ngos.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((ngos) => ngos ? Object.assign(ngos, body).save() : null)
    .then((ngos) => ngos ? ngos.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Ngos.findById(params.id)
    .then(notFound(res))
    .then((ngos) => ngos ? ngos.remove() : null)
    .then(success(res, 204))
    .catch(next)

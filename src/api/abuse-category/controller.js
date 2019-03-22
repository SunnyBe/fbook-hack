import { success, notFound } from '../../services/response/'
import { AbuseCategory } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  AbuseCategory.create(body)
    .then((abuseCategory) => abuseCategory.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  AbuseCategory.find(query, select, cursor)
    .then((abuseCategories) => abuseCategories.map((abuseCategory) => abuseCategory.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  AbuseCategory.findById(params.id)
    .then(notFound(res))
    .then((abuseCategory) => abuseCategory ? abuseCategory.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  AbuseCategory.findById(params.id)
    .then(notFound(res))
    .then((abuseCategory) => abuseCategory ? Object.assign(abuseCategory, body).save() : null)
    .then((abuseCategory) => abuseCategory ? abuseCategory.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  AbuseCategory.findById(params.id)
    .then(notFound(res))
    .then((abuseCategory) => abuseCategory ? abuseCategory.remove() : null)
    .then(success(res, 204))
    .catch(next)

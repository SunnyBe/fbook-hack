import { success, notFound } from '../../services/response/'
import { ExampleEndpoint } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  ExampleEndpoint.create(body)
    .then((exampleEndpoint) => exampleEndpoint.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  ExampleEndpoint.find(query, select, cursor)
    .then((exampleEndpoints) => exampleEndpoints.map((exampleEndpoint) => exampleEndpoint.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  ExampleEndpoint.findById(params.id)
    .then(notFound(res))
    .then((exampleEndpoint) => exampleEndpoint ? exampleEndpoint.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  ExampleEndpoint.findById(params.id)
    .then(notFound(res))
    .then((exampleEndpoint) => exampleEndpoint ? Object.assign(exampleEndpoint, body).save() : null)
    .then((exampleEndpoint) => exampleEndpoint ? exampleEndpoint.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  ExampleEndpoint.findById(params.id)
    .then(notFound(res))
    .then((exampleEndpoint) => exampleEndpoint ? exampleEndpoint.remove() : null)
    .then(success(res, 204))
    .catch(next)

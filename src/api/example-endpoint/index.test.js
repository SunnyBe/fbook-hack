import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { ExampleEndpoint } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, exampleEndpoint

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  exampleEndpoint = await ExampleEndpoint.create({})
})

test('POST /example-endpoints 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, user: 'test', title: 'test', message: 'test', likes: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.user).toEqual('test')
  expect(body.title).toEqual('test')
  expect(body.message).toEqual('test')
  expect(body.likes).toEqual('test')
})

test('POST /example-endpoints 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /example-endpoints 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /example-endpoints 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /example-endpoints 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /example-endpoints/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${exampleEndpoint.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(exampleEndpoint.id)
})

test('GET /example-endpoints/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${exampleEndpoint.id}`)
  expect(status).toBe(401)
})

test('GET /example-endpoints/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /example-endpoints/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${exampleEndpoint.id}`)
    .send({ access_token: adminSession, user: 'test', title: 'test', message: 'test', likes: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(exampleEndpoint.id)
  expect(body.user).toEqual('test')
  expect(body.title).toEqual('test')
  expect(body.message).toEqual('test')
  expect(body.likes).toEqual('test')
})

test('PUT /example-endpoints/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${exampleEndpoint.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /example-endpoints/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${exampleEndpoint.id}`)
  expect(status).toBe(401)
})

test('PUT /example-endpoints/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, user: 'test', title: 'test', message: 'test', likes: 'test' })
  expect(status).toBe(404)
})

test('DELETE /example-endpoints/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${exampleEndpoint.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /example-endpoints/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${exampleEndpoint.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /example-endpoints/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${exampleEndpoint.id}`)
  expect(status).toBe(401)
})

test('DELETE /example-endpoints/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

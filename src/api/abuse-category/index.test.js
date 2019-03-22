import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { AbuseCategory } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, abuseCategory

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  abuseCategory = await AbuseCategory.create({})
})

test('POST /abuse-categories 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, title: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
})

test('POST /abuse-categories 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /abuse-categories 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /abuse-categories 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /abuse-categories 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /abuse-categories/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${abuseCategory.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(abuseCategory.id)
})

test('GET /abuse-categories/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${abuseCategory.id}`)
  expect(status).toBe(401)
})

test('GET /abuse-categories/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /abuse-categories/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${abuseCategory.id}`)
    .send({ access_token: adminSession, title: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(abuseCategory.id)
  expect(body.title).toEqual('test')
})

test('PUT /abuse-categories/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${abuseCategory.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /abuse-categories/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${abuseCategory.id}`)
  expect(status).toBe(401)
})

test('PUT /abuse-categories/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, title: 'test' })
  expect(status).toBe(404)
})

test('DELETE /abuse-categories/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${abuseCategory.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /abuse-categories/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${abuseCategory.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /abuse-categories/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${abuseCategory.id}`)
  expect(status).toBe(401)
})

test('DELETE /abuse-categories/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

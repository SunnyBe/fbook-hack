import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Ngos } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, adminSession, ngos

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  adminSession = signSync(admin.id)
  ngos = await Ngos.create({ user })
})

test('POST /ngos 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, cacNumber: 'test', isVerified: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.cacNumber).toEqual('test')
  expect(body.isVerified).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /ngos 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /ngos 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /ngos 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /ngos/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${ngos.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(ngos.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /ngos/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${ngos.id}`)
  expect(status).toBe(401)
})

test('GET /ngos/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /ngos/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${ngos.id}`)
    .send({ access_token: userSession, cacNumber: 'test', isVerified: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(ngos.id)
  expect(body.cacNumber).toEqual('test')
  expect(body.isVerified).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /ngos/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${ngos.id}`)
    .send({ access_token: anotherSession, cacNumber: 'test', isVerified: 'test' })
  expect(status).toBe(401)
})

test('PUT /ngos/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${ngos.id}`)
  expect(status).toBe(401)
})

test('PUT /ngos/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, cacNumber: 'test', isVerified: 'test' })
  expect(status).toBe(404)
})

test('DELETE /ngos/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${ngos.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /ngos/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${ngos.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /ngos/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${ngos.id}`)
  expect(status).toBe(401)
})

test('DELETE /ngos/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Message } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, message

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  message = await Message.create({ user })
})

test('POST /messages 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, report: 'test', message: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.report).toEqual('test')
  expect(body.message).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /messages 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /messages 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /messages 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /messages/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${message.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(message.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /messages/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${message.id}`)
  expect(status).toBe(401)
})

test('GET /messages/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /messages/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${message.id}`)
    .send({ access_token: userSession, report: 'test', message: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(message.id)
  expect(body.report).toEqual('test')
  expect(body.message).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /messages/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${message.id}`)
    .send({ access_token: anotherSession, report: 'test', message: 'test' })
  expect(status).toBe(401)
})

test('PUT /messages/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${message.id}`)
  expect(status).toBe(401)
})

test('PUT /messages/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, report: 'test', message: 'test' })
  expect(status).toBe(404)
})

test('DELETE /messages/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${message.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /messages/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${message.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /messages/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${message.id}`)
  expect(status).toBe(401)
})

test('DELETE /messages/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})

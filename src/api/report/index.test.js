import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Report } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, adminSession, report

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  adminSession = signSync(admin.id)
  report = await Report.create({ user })
})

test('POST /reports 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, assignedTo: 'test', title: 'test', message: 'test', category: 'test', views: 'test', isAnonymous: 'test', isPublic: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.assignedTo).toEqual('test')
  expect(body.title).toEqual('test')
  expect(body.message).toEqual('test')
  expect(body.category).toEqual('test')
  expect(body.views).toEqual('test')
  expect(body.isAnonymous).toEqual('test')
  expect(body.isPublic).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /reports 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /reports 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /reports 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /reports/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${report.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(report.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /reports/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${report.id}`)
  expect(status).toBe(401)
})

test('GET /reports/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /reports/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${report.id}`)
    .send({ access_token: userSession, assignedTo: 'test', title: 'test', message: 'test', category: 'test', views: 'test', isAnonymous: 'test', isPublic: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(report.id)
  expect(body.assignedTo).toEqual('test')
  expect(body.title).toEqual('test')
  expect(body.message).toEqual('test')
  expect(body.category).toEqual('test')
  expect(body.views).toEqual('test')
  expect(body.isAnonymous).toEqual('test')
  expect(body.isPublic).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /reports/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${report.id}`)
    .send({ access_token: anotherSession, assignedTo: 'test', title: 'test', message: 'test', category: 'test', views: 'test', isAnonymous: 'test', isPublic: 'test' })
  expect(status).toBe(401)
})

test('PUT /reports/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${report.id}`)
  expect(status).toBe(401)
})

test('PUT /reports/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, assignedTo: 'test', title: 'test', message: 'test', category: 'test', views: 'test', isAnonymous: 'test', isPublic: 'test' })
  expect(status).toBe(404)
})

test('DELETE /reports/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${report.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /reports/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${report.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /reports/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${report.id}`)
  expect(status).toBe(401)
})

test('DELETE /reports/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

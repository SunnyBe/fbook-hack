import { Report } from '.'
import { User } from '../user'

let user, report

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  report = await Report.create({ user, assignedTo: 'test', title: 'test', message: 'test', category: 'test', views: 'test', isAnonymous: 'test', isPublic: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = report.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(report.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.assignedTo).toBe(report.assignedTo)
    expect(view.title).toBe(report.title)
    expect(view.message).toBe(report.message)
    expect(view.category).toBe(report.category)
    expect(view.views).toBe(report.views)
    expect(view.isAnonymous).toBe(report.isAnonymous)
    expect(view.isPublic).toBe(report.isPublic)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = report.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(report.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.assignedTo).toBe(report.assignedTo)
    expect(view.title).toBe(report.title)
    expect(view.message).toBe(report.message)
    expect(view.category).toBe(report.category)
    expect(view.views).toBe(report.views)
    expect(view.isAnonymous).toBe(report.isAnonymous)
    expect(view.isPublic).toBe(report.isPublic)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

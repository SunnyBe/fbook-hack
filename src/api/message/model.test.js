import { Message } from '.'
import { User } from '../user'

let user, message

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  message = await Message.create({ user, report: 'test', message: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = message.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(message.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.report).toBe(message.report)
    expect(view.message).toBe(message.message)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = message.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(message.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.report).toBe(message.report)
    expect(view.message).toBe(message.message)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

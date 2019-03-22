import { Ngos } from '.'
import { User } from '../user'

let user, ngos

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  ngos = await Ngos.create({ user, cacNumber: 'test', isVerified: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = ngos.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(ngos.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.cacNumber).toBe(ngos.cacNumber)
    expect(view.isVerified).toBe(ngos.isVerified)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = ngos.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(ngos.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.cacNumber).toBe(ngos.cacNumber)
    expect(view.isVerified).toBe(ngos.isVerified)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

import { ExampleEndpoint } from '.'

let exampleEndpoint

beforeEach(async () => {
  exampleEndpoint = await ExampleEndpoint.create({ user: 'test', title: 'test', message: 'test', likes: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = exampleEndpoint.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(exampleEndpoint.id)
    expect(view.user).toBe(exampleEndpoint.user)
    expect(view.title).toBe(exampleEndpoint.title)
    expect(view.message).toBe(exampleEndpoint.message)
    expect(view.likes).toBe(exampleEndpoint.likes)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = exampleEndpoint.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(exampleEndpoint.id)
    expect(view.user).toBe(exampleEndpoint.user)
    expect(view.title).toBe(exampleEndpoint.title)
    expect(view.message).toBe(exampleEndpoint.message)
    expect(view.likes).toBe(exampleEndpoint.likes)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

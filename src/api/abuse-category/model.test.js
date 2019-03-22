import { AbuseCategory } from '.'

let abuseCategory

beforeEach(async () => {
  abuseCategory = await AbuseCategory.create({ title: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = abuseCategory.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(abuseCategory.id)
    expect(view.title).toBe(abuseCategory.title)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = abuseCategory.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(abuseCategory.id)
    expect(view.title).toBe(abuseCategory.title)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

import faker from '@faker-js/faker'
import ObjectIdValidation from '@validations/ObjectId'

describe('create user', () => {
  it('deve ser um erro de lançamento', async () => {
    const at = ObjectIdValidation.validateId(faker.datatype.uuid())

    expect(at).toHaveProperty('message')
  })
})

import * as Joi from 'joi'

export default class ObjectIdValidation {
  public static validateId(id: string): void | { message: string } {
    const reg = /^[0-9a-fA-F]{24}/
    const schema = Joi.object({
      id: Joi.string()
        .pattern(new RegExp(reg))
        .message('"id" must be a valid ObjectId')
    })

    const { error } = schema.validate({ id }, { abortEarly: false })
    if (error) return { message: error.details[0].message }
  }
}

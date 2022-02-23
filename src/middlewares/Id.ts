import { NextFunction, Request, Response } from 'express'

import { HttpStatus } from '../utils/HttpStatus'
import ObjectIdValidation from '../validations/ObjectId'

export const validateId = (
  request: Request,
  response: Response,
  next: NextFunction
): void | Response => {
  const { id } = request.params
  if (!id) return
  const validate = ObjectIdValidation.validateId(id)

  if (validate) {
    return response.status(HttpStatus.BAD_REQUEST).json({ ...validate })
  }

  next()
}

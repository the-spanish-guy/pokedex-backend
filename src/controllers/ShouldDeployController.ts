import { Request, Response } from 'express'
import ShouldDeployService from '@services/ShouldDeployService'

class ShouldDeployController {
  public async index(request: Request, response: Response): Promise<Response> {
    const shouldDeploy = await ShouldDeployService.index()
    return response.json(shouldDeploy)
  }
}

export default new ShouldDeployController()

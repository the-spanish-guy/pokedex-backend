import { deployConnection } from './HttpService'
import { IShouldIDeployToday } from '@interfaces/ShouldDeployInterface'

class ShouldDeployService {
  public async index(): Promise<IShouldIDeployToday[]> {
    return await deployConnection
      .get<IShouldIDeployToday[]>('/?tz=UTC')
      .then(({ data }) => data)
  }
}

export default new ShouldDeployService()

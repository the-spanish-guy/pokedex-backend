import { Request, Response } from 'express'
import PokemonService from '@services/PokemonService'

class PokemonController {
  public async index(request: Request, response: Response): Promise<Response> {
    const shouldDeploy = await PokemonService.index()
    return response.json(shouldDeploy)
  }

  public async show(requets: Request, response: Response): Promise<Response> {
    const { id } = requets.params
    const pokemon = await PokemonService.show(id)
    return response.json(pokemon)
  }
}

export default new PokemonController()

import { Request, Response } from 'express'
import PokemonService from '../services/PokemonService'

class PokemonController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id, offset } = request.query

    if (id) {
      const pokemon = await PokemonService.getOne(id as string)
      return response.json([pokemon])
    }

    const pokemons = await PokemonService.index(Number(offset))
    return response.json(pokemons)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const pokemon = await PokemonService.show(id)
    return response.json(pokemon)
  }

  public async getByType(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params
    const pokemons = await PokemonService.getByType(id)

    return response.json(pokemons)
  }
}

export default new PokemonController()

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

  public async show(requets: Request, response: Response): Promise<Response> {
    const { id } = requets.params
    const pokemon = await PokemonService.show(id)
    return response.json(pokemon)
  }
}

export default new PokemonController()

import { AxiosError } from 'axios'
import { Request, Response } from 'express'
import PokemonService from '../services/PokemonService'

class PokemonController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id, offset } = request.query

    if (id) {
      return await PokemonService.getOne(id as string)
        .then(pokemon => response.json([pokemon]))
        .catch((error: AxiosError) => {
          const statusCode = error.response.status
          return response
            .status(statusCode)
            .json({ msg: error.response.data, statusCode })
        })
    }

    const pokemons = await PokemonService.index(Number(offset))
    return response.json(pokemons)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    return await PokemonService.show(id)
      .then(pokemon => response.json(pokemon))
      .catch((error: AxiosError) => {
        const statusCode = error.response.status
        return response
          .status(statusCode)
          .json({ msg: error.response.data, statusCode })
      })
  }

  public async getByType(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params
    return await PokemonService.getByType(id)
      .then(pokemons => response.json(pokemons))
      .catch((error: AxiosError) => {
        const statusCode = error.response.status

        return response
          .status(statusCode)
          .json({ msg: 'Informed type does not exist', statusCode })
      })
  }
}

export default new PokemonController()

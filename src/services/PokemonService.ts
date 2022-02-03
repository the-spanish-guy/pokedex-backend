import { pokemonConnection } from './HttpService'
import {
  IMages,
  IResultPokemon,
  ResultPokemon
} from '@interfaces/ResultPokemonApiInterface'
import { IPokemonApi, ISprite } from '@interfaces/PokemonApiInterface'
import { getColor } from '@utils/ColorUtils'
import {
  IFlavorTextEntries,
  IPokemonSpecieApi
} from '@interfaces/PokemonSpecieApiInterface'

class PokemonService {
  private getImages({
    other: { dream_world: dreamWorld, 'official-artwork': officialArtwork }
  }: ISprite): IMages {
    return { svg: dreamWorld.front_default, url: officialArtwork.front_default }
  }

  private getInfo(flavors: IFlavorTextEntries[]) {
    const [description] = flavors
      .filter(desc => desc.language.name === 'en')
      .sort(
        ({ version }, { version: versionB }) => +version.url - +versionB.url
      )
      .slice(-1)
    return description.flavor_text
  }

  private async getSpecie(id: string): Promise<IPokemonSpecieApi> {
    return await pokemonConnection
      .get<IPokemonSpecieApi>(`/pokemon-species/${id}`)
      .then(({ data }) => data)
  }

  private async getSpecificPokemon(id: string): Promise<IPokemonApi> {
    return await pokemonConnection
      .get<IPokemonApi>(`/pokemon/${id}`)
      .then(({ data }) => data)
  }

  public async index(): Promise<ResultPokemon[]> {
    const { results } = await pokemonConnection
      .get<IResultPokemon>('/pokemon')
      .then(({ data }) => data)

    const pokemonResult: ResultPokemon[] = []

    for await (const pokemon of results) {
      const data = await this.getOne(pokemon.name)

      pokemonResult.push({
        ...data
      })
    }

    return pokemonResult.map(pokemon => new ResultPokemon(pokemon))
  }

  public async getOne(id: string): Promise<ResultPokemon> {
    const data = await this.getSpecificPokemon(id)
    const { flavor_text_entries: flavorTextEntries } = await this.getSpecie(
      String(data.id)
    )
    const result: ResultPokemon = {
      id: data.id,
      name: data.name,
      images: this.getImages(data.sprites),
      types: data.types,
      color: getColor(data.types[0].type.name),
      info: this.getInfo(flavorTextEntries)
    }

    return result
  }

  public async show(id: string): Promise<IPokemonApi> {
    return await pokemonConnection
      .get<IPokemonApi>(`/pokemon/${id}`)
      .then(({ data }) => data)
  }
}

export default new PokemonService()

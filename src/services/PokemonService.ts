import { pokemonConnection } from './HttpService'
import {
  IMages,
  IResultPokemon,
  ResultPokemon
} from '../interfaces/ResultPokemonApiInterface'
import { IPokemonApi, ISprite } from '../interfaces/PokemonApiInterface'
import { getColor } from '../utils/ColorUtils'
import {
  IFlavorTextEntries,
  IGenera,
  IPokemonSpecieApi
} from '../interfaces/PokemonSpecieApiInterface'
import { IPokemon, IType } from '../interfaces/PokemonInterface'
import { IPokemonGender } from '../interfaces/PokemonGenderApiInterface'
import { formatHeight, formatWeight } from '../utils/MeasurementsUtils'
import {
  getCatchRate,
  getEffectivetypeByType,
  getEvolves,
  getGenderRate,
  getVulnarability
} from '../utils/PokemonUtils'
import { IEvolutionChainApi } from '../interfaces/PokemonEvolutionChainApi'

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

  private getCategory(genera: IGenera[]): string {
    const [category] = genera
      .filter(({ language }) => language.name === 'en')
      .map(({ genus }) => genus.split(' ')[0])

    return category
  }

  private async getPokemonGender(name: string): Promise<IPokemonGender> {
    return await pokemonConnection
      .get<IPokemonGender>(`/gender/${name}`)
      .then(({ data }) => data)
  }

  private async getEvolutions(
    evolutionChain: number
  ): Promise<IEvolutionChainApi> {
    const res = await pokemonConnection
      .get(`/evolution-chain/${evolutionChain}/`)
      .then(({ data }) => data)
      .catch(e => {
        if (e.response.status) {
          return ''
        }
        console.error('[ERROR] error while get list of pokemons ', e)
      })

    return res
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

  public async show(id: string): Promise<IPokemon> {
    const {
      height,
      weight,
      abilities,
      name,
      types,
      base_experience: baseExperience,
      stats
    } = await this.getSpecificPokemon(id)

    const {
      varieties,
      genera,
      base_happiness: baseHappiness,
      capture_rate: captureRate,
      growth_rate: growthRate,
      egg_groups: eggGroups,
      evolution_chain: evolutionChain,
      gender_rate: genderRate
    } = await this.getSpecie(id)

    const chain = evolutionChain.url.replace(/\D/g, '').substring(1)
    const evolutionsApi = await this.getEvolutions(Number(chain))
    const evolves = getEvolves(evolutionsApi.chain)

    const typeEffective: IType[] = getEffectivetypeByType(types)

    const [
      { pokemon_species_details: male },
      { pokemon_species_details: female },
      { pokemon_species_details: genderless }
    ] = await Promise.all([
      this.getPokemonGender('male'),
      this.getPokemonGender('female'),
      this.getPokemonGender('genderless')
    ])

    const genders: Array<string> = []
    male.forEach(({ pokemon_species: pokeName }) => {
      if (pokeName.name === name) genders.push('male')
    })
    female.forEach(({ pokemon_species: pokeName }) => {
      if (pokeName.name === name) genders.push('female')
    })
    genderless.forEach(({ pokemon_species: pokeName }) => {
      if (pokeName.name === name) genders.push('unknow')
    })

    const weakness = getVulnarability(types) as Array<string>

    return {
      height: formatHeight(height),
      weight: formatWeight(weight),
      abilities,
      category: this.getCategory(genera),
      gender: genders,
      weakness,
      other_forms: varieties,
      training: {
        base_friendship: baseHappiness,
        catch_rate: getCatchRate(captureRate),
        growth_rate: growthRate.name,
        base_exp: baseExperience,
        ev_yield: stats.filter(r => r.effort >= 1)
      },
      base_stats: stats,
      breeding: {
        egg_groups:
          eggGroups[0].name === 'no-eggs'
            ? [{ name: 'Undiscovered', url: '' }]
            : eggGroups,
        gender_rate: getGenderRate(genderRate)
      },
      evolves,
      type: typeEffective
    }
  }
}

export default new PokemonService()

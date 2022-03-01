import { pokemonConnection } from './HttpService'
import {
  IIMages,
  IResultPokemon,
  ResultPokemon
} from '../interfaces/ResultPokemonApiInterface'
import { IPokemonApi, ISprite, IStats } from '../interfaces/PokemonApiInterface'
import { getColor } from '../utils/ColorUtils'
import {
  IFlavorTextEntries,
  IGenera,
  IPokemonSpecieApi
} from '../interfaces/PokemonSpecieApiInterface'
import { IPokemon, IPokemonStats, IType } from '../interfaces/PokemonInterface'
import { IPokemonGender } from '../interfaces/PokemonGenderApiInterface'
import { formatHeight, formatWeight } from '../utils/MeasurementsUtils'
import {
  getCatchRate,
  getEffectivetypeByType,
  getEvolves,
  getGenderRate,
  getVulnarability,
  LEVEL_POKEMON,
  MAX_EV,
  MAX_IV,
  MIN_EV,
  MIN_IV,
  POKEMON_NATURE
} from '../utils/PokemonUtils'
import { IEvolutionChainApi } from '../interfaces/PokemonEvolutionChainApi'

class PokemonService {
  private getImages({
    other: { dream_world: dreamWorld, 'official-artwork': officialArtwork }
  }: ISprite): IIMages {
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

  private getStats(stats: IStats[]): IPokemonStats[] {
    const [hp, ...restStats] = stats

    const result: IPokemonStats[] = [
      {
        name: 'hp',
        stat: hp.base_stat,
        min:
          Math.floor(
            0.01 *
              (2 * hp.base_stat + MIN_IV + Math.floor(0.25 * MIN_EV)) *
              LEVEL_POKEMON
          ) +
          LEVEL_POKEMON +
          10,
        max:
          Math.floor(
            0.01 *
              (2 * hp.base_stat + MAX_IV + Math.floor(0.25 * MAX_EV)) *
              LEVEL_POKEMON
          ) +
          LEVEL_POKEMON +
          10
      }
    ]

    restStats.forEach(stat => {
      result.push({
        name: stat.stat.name,
        stat: stat.base_stat,
        min: Math.floor(
          Math.floor(
            Math.floor(
              0.01 *
                (2 * stat.base_stat + MIN_IV + Math.floor(0.25 * MIN_EV)) *
                LEVEL_POKEMON
            ) + 4
          ) / POKEMON_NATURE
        ),
        max: Math.floor(
          Math.floor(
            Math.floor(
              0.01 *
                (2 * stat.base_stat + MAX_IV + Math.floor(0.25 * MAX_EV)) *
                LEVEL_POKEMON
            ) + 5
          ) * POKEMON_NATURE
        )
      })
    })

    return result
  }

  public async index(offset = 20, limit = 20): Promise<ResultPokemon[]> {
    const { results } = await pokemonConnection
      .get<IResultPokemon>(`/pokemon?offset=${offset}&limit=${limit}`)
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
    console.log({ data })
    const { flavor_text_entries: flavorTextEntries } = await this.getSpecie(
      String(data.species.name)
    )

    console.log('depois de get specie')
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

  public async show(idOrName: string): Promise<IPokemon> {
    const {
      id,
      name,
      types,
      stats,
      weight,
      height,
      sprites,
      abilities,
      base_experience: baseExperience
    } = await this.getSpecificPokemon(idOrName)

    const {
      varieties,
      genera,
      base_happiness: baseHappiness,
      capture_rate: captureRate,
      growth_rate: growthRate,
      egg_groups: eggGroups,
      evolution_chain: evolutionChain,
      gender_rate: genderRate
    } = await this.getSpecie(idOrName)

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
      id,
      name,
      height: formatHeight(height),
      weight: formatWeight(weight),
      abilities,
      category: this.getCategory(genera),
      gender: genders,
      weakness,
      types: types,
      color: getColor(types[0].type.name),
      images: this.getImages(sprites),
      other_forms: varieties,
      training: {
        base_friendship: baseHappiness,
        catch_rate: getCatchRate(captureRate),
        growth_rate: growthRate.name,
        base_exp: baseExperience,
        ev_yield: stats.filter(r => r.effort >= 1)
      },
      breeding: {
        egg_groups:
          eggGroups[0].name === 'no-eggs'
            ? [{ name: 'Undiscovered', url: '' }]
            : eggGroups,
        gender_rate: getGenderRate(genderRate)
      },
      base_stats: this.getStats(stats),
      effective_type: typeEffective,
      evolves
    }
  }
}

export default new PokemonService()

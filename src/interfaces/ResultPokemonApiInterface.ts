import { ITypes } from './PokemonApiInterface'

interface IResult {
  name: string
  url: string
}

export interface IResultPokemon {
  count: number
  next: string
  previous: null | string
  results: IResult[]
}

export interface IImages {
  url: string
  svg: string
}

export class ResultPokemonInput {
  id: number
  name: string
  images: IImages
  color: string
  types: ITypes[]
  info: string
}

export class ResultPokemon {
  id: number
  name: string
  images: IImages
  color: string
  types: ITypes[]
  info: string

  constructor(pokemon: ResultPokemonInput) {
    this.id = pokemon.id
    this.name = pokemon.name
    this.images = pokemon.images
    this.color = pokemon.color
    this.types = pokemon.types
    this.info = pokemon.info
  }
}

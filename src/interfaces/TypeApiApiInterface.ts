import { IResult } from './PokemonApiInterface'

interface ITypeRelationsApi {
  ['no_damage_to']: IResult[]
  ['half_damage_to']: IResult[]
  ['double_damage_to']: IResult[]
  ['no_damage_from']: IResult[]
  ['half_damage_from']: IResult[]
  ['double_damage_from']: IResult[]
}

interface ITypeRelationPastApi {
  generation: IResult
  ['damage_relations']: ITypeRelationsApi
}

interface IGenerationGameIndexApi {
  ['game_index']: number
  generation: IResult
}

interface INameApi {
  name: string
  language: IResult
}

interface ITypePokemonApi {
  slot: number
  pokemon: IResult
}

export interface ITypeApi {
  name: string
  id: number
  ['damage_relations']: ITypeRelationsApi
  ['past_damage_relations']: ITypeRelationPastApi[]
  ['game_indices']: IGenerationGameIndexApi[]
  generation: IResult
  ['move_damage_class']: IResult
  names: INameApi[]
  pokemon: ITypePokemonApi[]
  moves: IResult[]
}

import { IAbilities, IResult, IStats } from './PokemonApiInterface'

interface IEvYield {
  ['base_stat']: number
  effort: number
  stat: IResult
}
interface ITraining {
  ['catch_rate']: string
  ['base_friendship']: number
  ['growth_rate']: string
  ['base_exp']: number
  ['ev_yield']: IEvYield[]
}

interface IGenderRate {
  name: string
  rate: number
}

interface IBreeding {
  ['egg_groups']: IResult[]
  ['gender_rate']: IGenderRate[]
}

export interface IType {
  type: string
  value: number
}

interface IEvolves {
  name: string
  ['min_level']: string
  url: string
}

interface IOtherForms {
  ['is_default']: boolean
  pokemon: IResult
}

export interface IPokemon {
  weight: string
  height: string
  abilities: IAbilities[]
  category: string
  gender: Array<string>
  weakness: Array<string>

  training: ITraining
  breeding: IBreeding
  ['base_stats']: IStats[]
  type: IType[]
  evolves: IEvolves[]
  ['other_forms']: IOtherForms[]
}

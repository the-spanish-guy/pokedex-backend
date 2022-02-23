import { IResult } from './PokemonApiInterface'

export interface IEvolutionDetails {
  item: null
  trigger: IResult
  gender: string | null
  ['held_item']: string | null
  ['known_move']: string | null
  ['known_move_type']: string | null
  location: string | null
  ['min_level']: number
  ['min_happiness']: string | null
  ['min_beauty']: string | null
  ['min_affection']: string | null
  ['needs_overworld_rain']: boolean
  ['party_species']: string | null
  ['party_type']: string | null
  ['relative_physical_stats']: string | null
  ['time_of_day']: ''
  ['trade_species']: string | null
  ['turn_upside_down']: boolean
}

export interface IEvolvesTo {
  ['is_baby']: boolean
  species: IResult
  ['evolution_details']: IEvolutionDetails[]
  ['evolves_to']: IEvolvesTo[]
}

export interface IChain {
  ['is_baby']: boolean
  species: IResult
  ['evolution_details']: IEvolutionDetails[] | null
  ['evolves_to']: IEvolvesTo[]
}

export interface IEvolutionChainApi {
  id: number
  ['baby_trigger_item']: string | null
  chain: IChain
}

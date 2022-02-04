import { IResult } from './PokemonApiInterface'

interface IPokemonSpeciesDetails {
  rate: number
  ['pokemon_species']: IResult
}

export interface IPokemonGender {
  id: number
  name: string
  ['pokemon_species_details']: IPokemonSpeciesDetails[]
  ['required_for_evolution']: IResult[]
}

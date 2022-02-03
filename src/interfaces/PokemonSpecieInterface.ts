import { IResult } from './PokemonInterface'

interface ILanguage {
  language: IResult
}

export interface IFlavorTextEntries {
  ['flavor_text']: string
  language: IResult
  version: IResult
}

interface IPokedexNumbers {
  ['entry_number']: number
  pokedex: IResult
}

interface INames extends ILanguage {
  name: string
}

interface IGenera extends ILanguage {
  genus: string
}

interface IVarieties extends ILanguage {
  ['is_default']: boolean
}

interface IFormDescriptions extends ILanguage {
  description: string
}

export interface IPokemonSpecie {
  ['id']: number
  habitat: null
  shape: IResult
  color: IResult
  names: INames[]
  genera: IGenera[]
  ['order']: number
  generation: IResult
  ['name']: 'wormadam'
  ['is_baby']: boolean
  varieties: IVarieties[]
  ['gender_rate']: number
  ['growth_rate']: IResult
  ['capture_rate']: number
  ['is_mythical']: boolean
  ['is_legendary']: boolean
  ['hatch_counter']: number
  ['egg_groups']: IResult[]
  ['base_happiness']: number
  ['forms_switchable']: boolean
  ['evolves_from_species']: IResult
  ['has_gender_differences']: boolean
  ['pokedex_numbers']: IPokedexNumbers[]
  ['evolution_chain']: Omit<IResult, 'name'>
  ['form_descriptions']: IFormDescriptions[]
  ['flavor_text_entries']: IFlavorTextEntries[]
}

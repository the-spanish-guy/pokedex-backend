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

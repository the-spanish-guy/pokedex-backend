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

interface IMages {
  url: string
  svg: string
}

export class ResultPokemon {
  id: string
  name: string
  images: IMages
  color: string
  info: string
}

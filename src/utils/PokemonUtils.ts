import { ITypes } from '@interfaces/PokemonApiInterface'
import { IType } from '@interfaces/PokemonInterface'

const getEffectiveByType = (
  type: string
): { vulnerability: Array<string>; resistent: Array<string> } => {
  const effectivesTypes = {
    bug: {
      vulnerability: ['flying', 'rock', 'fire'],
      resistent: ['fighting', 'ground', 'grass']
    },
    dark: {
      vulnerability: ['fighting', 'bug', 'fairy'],
      resistent: ['ghost', 'psychic', 'dark']
    },
    dragon: {
      vulnerability: ['ice', 'dragon', 'fairy'],
      resistent: ['fire', 'water', 'grass', 'electric']
    },
    electric: {
      vulnerability: ['ground'],
      resistent: ['flying', 'steel', 'electric']
    },
    fairy: {
      vulnerability: ['poison', 'steel'],
      resistent: ['flying', 'bug', 'dragon', 'dark']
    },
    fighting: {
      vulnerability: ['flying', 'psychic', 'fairy'],
      resistent: ['rock', 'bug', 'dark']
    },
    fire: {
      vulnerability: ['ground', 'rock', 'water'],
      resistent: ['bug', 'steel', 'fire', 'grass', 'ice']
    },
    flying: {
      vulnerability: ['rock', 'electric', 'ice'],
      resistent: ['fighting', 'ground', 'bug', 'fairy']
    },
    ghost: {
      vulnerability: ['ghost', 'dark'],
      resistent: ['normal', 'fighting', 'poison', 'bug']
    },
    grass: {
      vulnerability: ['flying', 'poison', 'bug', 'fire', 'ice'],
      resistent: ['ground', 'water', 'grass', 'electric']
    },
    ground: {
      vulnerability: ['water', 'grass', 'ice'],
      resistent: ['poison', 'rock', 'electric']
    },
    ice: {
      vulnerability: ['fighting', 'rock', 'steel', 'fire'],
      resistent: ['ice']
    },
    normal: {
      vulnerability: ['fighting'],
      resistent: ['ghost']
    },
    poison: {
      vulnerability: ['ground', 'psychic'],
      resistent: ['fighting', 'poison', 'grass', 'fairy']
    },
    psychic: {
      vulnerability: ['grass', 'ghost', 'dark'],
      resistent: ['fighting', 'psychic']
    },
    rock: {
      vulnerability: ['fighting', 'ground', 'steel', 'water', 'grass'],
      resistent: ['normal', 'flying', 'poison', 'fire']
    },
    steel: {
      vulnerability: ['fighting', 'ground', 'fire'],
      resistent: [
        'normal',
        'flying',
        'poison',
        'rock',
        'bug',
        'steel',
        'grass',
        'psychic',
        'ice',
        'dragon',
        'fairy'
      ]
    },
    water: {
      vulnerability: ['grass', 'electric'],
      resistent: ['steel', 'fire', 'water', 'ice']
    }
  }

  return effectivesTypes[type]
}

const typesOfPokemon = [
  'NORMAL',
  'FIGHTING',
  'FLYING',
  'POISON',
  'GROUND',
  'ROCK',
  'BUG',
  'GHOST',
  'STEEL',
  'FIRE',
  'WATER',
  'GRASS',
  'ELECTRIC',
  'PSYCHIC',
  'ICE',
  'DRAGON',
  'DARK',
  'FAIRY'
]

export const getVulnarability = (
  types: ITypes[],
  returnAll = false
):
  | Array<string>
  | Array<{
      ['name_type']: string
      effective: string | number
    }> => {
  console.log(types)
  const vulnerabilities: Array<string> = []
  const resistance: Array<string> = []

  types.forEach(({ type }) => {
    const { vulnerability, resistent } = getEffectiveByType(type.name)
    vulnerabilities.push(...vulnerability)
    resistance.push(...resistent)
  })

  const weakness: Array<string> = []
  vulnerabilities.forEach(vulnerability => {
    if (!resistance.includes(vulnerability)) {
      weakness.push(vulnerability)
    }
  })

  // const weakness = weak.filter((este, i) => weak.indexOf(este) === i)

  if (returnAll) {
    const res: Array<{
      ['name_type']: string
      effective: string | number
    }> = []
    weakness.forEach(we => {
      res.push({
        name_type: we,
        effective: 2
      })
    })
    resistance.forEach(r => {
      res.push({ name_type: r, effective: '1/2' })
    })

    return res
  }

  return weakness
}

const effectiveTableOfType = [
  [1, 1, 1, 1, 1, 0.5, 1, 0, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 1, 0.5, 0.5, 1, 2, 0.5, 0, 2, 1, 1, 1, 1, 0.5, 2, 1, 2, 0.5],
  [1, 2, 1, 1, 1, 0.5, 2, 1, 0.5, 1, 1, 2, 0.5, 1, 1, 1, 1, 1],
  [1, 1, 1, 0.5, 0.5, 0.5, 1, 0.5, 0, 1, 1, 2, 1, 1, 1, 1, 1, 2],
  [1, 1, 0, 2, 1, 2, 0.5, 1, 2, 2, 1, 0.5, 2, 1, 1, 1, 1, 1],
  [1, 0.5, 2, 1, 0.5, 1, 2, 1, 0.5, 2, 1, 1, 1, 1, 2, 1, 1, 1],
  [1, 0.5, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 0.5, 1, 2, 1, 2, 1, 1, 2, 0.5],
  [0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0.5, 1],
  [1, 1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 0.5, 1, 0.5, 1, 2, 1, 1, 2],
  [1, 1, 1, 1, 1, 0.5, 2, 1, 2, 0.5, 0.5, 2, 1, 1, 2, 0.5, 1, 1],
  [1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 0.5, 0.5, 1, 1, 1, 0.5, 1, 1],
  [1, 1, 0.5, 0.5, 2, 2, 0.5, 1, 0.5, 0.5, 2, 0.5, 1, 1, 1, 0.5, 1, 1],
  [1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 2, 0.5, 0.5, 1, 1, 0.5, 1, 1],
  [1, 2, 1, 2, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 0.5, 1, 1, 0, 1],
  [1, 1, 2, 1, 2, 1, 1, 1, 0.5, 0.5, 0.5, 2, 1, 1, 0.5, 2, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 1, 1, 2, 1, 0],
  [1, 0.5, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0.5, 0.5],
  [1, 2, 1, 0.5, 1, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 1, 1, 2, 2, 1]
]

export const getCatchRate = (captureRate: number) => {
  const rate = Math.round((100 / 255) * captureRate)
  return `${captureRate} (${rate}%, full HP)`
}

const findIndex = (type: string) => {
  console.log('findIndex')
  console.log(type)
  // return typesOfPokemon.findIndex((valueType, index) => valueType === type ? index : -1)
  // eslint-disable-next-line array-callback-return
  return typesOfPokemon.findIndex((valueType, index) => {
    console.log('t', valueType)
    if (valueType === type) {
      return index
    }
  })
}

const arrContentNumber = (arr: IType[]) => {
  const res: IType[] = []
  arr.forEach(el => {
    if (!Number.isNaN(el.value) && el.value !== 1) {
      res.push({ type: el.type, value: el.value })
    }
  })
  return res
}

export const getEffectivetypeByType = (types: ITypes[]) => {
  console.info('types of pokemons')
  console.log(types)
  const type1: string = types[0].type.name.toUpperCase()
  let type2: string | null = null

  if (types.length > 1) {
    type2 = types[1].type.name.toUpperCase()
  }

  const sum: Array<{ type: string; value: number }> = []
  const index1 = findIndex(type1)
  const index2 = findIndex(type2)

  for (let i = 0; i < effectiveTableOfType.length; i++) {
    if (!type2) {
      const value = effectiveTableOfType[i][index2]
      const result = { type: typesOfPokemon[i], value }

      sum.push(result)
    }
    const value: number =
      effectiveTableOfType[i][index1] * effectiveTableOfType[i][index2]
    const result = { type: typesOfPokemon[i], value }

    sum.push(result)
  }
  const res = arrContentNumber(sum)

  console.log(JSON.stringify(res, null, 2))

  return res
}

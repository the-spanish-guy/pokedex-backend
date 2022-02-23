export const getColor = (type: string): string => {
  const types = {
    bug: '#C5DC90',
    dark: '#A7A6AB',
    dragon: '#7FB0E2',
    electric: '#F8EBA1',
    fairy: '#F6C4F1',
    fighting: '#E79BAA',
    fire: '#FCD0A0',
    flying: '#CDDBF5',
    ghost: '#AAB2DB',
    grass: '#ABDCA7',
    ground: '#EBBAA1',
    ice: '#B6E6DE',
    normal: '#CDCECC',
    poison: '#D9ACE5',
    psychic: '#FCBEBD',
    rock: '#E2DBC1',
    steel: '#A6C7CE',
    water: '#A4CBEE'
  }

  return types[type]
}

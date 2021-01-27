const {
  getAllPokemons,
  getSpecificPokemon,
  getImagePokemon,
  getSpecie
} = require('../services/api')
const { getColor, getInfo } = require('../utils/utils')

module.exports = {
  async show(req, res) {
    const { results } = await getAllPokemons()

    const promises = results.map(async ({ name }) => {
      console.log('entrei')
      const pokemon = await getSpecificPokemon(name)
      const img = pokemon.sprites.other['official-artwork'].front_default
      const type = getColor(pokemon.types[0].type.name)
      const { flavor_text_entries } = await getSpecie(pokemon.id)
      const info = getInfo(flavor_text_entries)

      return {
        id: pokemon.id,
        name: pokemon.name,
        url: img,
        svg: pokemon.sprites.other.dream_world.front_default,
        color: type,
        types: pokemon.types,
        info,
        all: pokemon
      }
    })
    const arr = await Promise.all(promises)

    res.json({ data: arr })
  },

  async index(req, res) {
    const { idOrName } = req.params

    const pokemon = await getSpecificPokemon(idOrName)

    // prevent name with -
    const splitName = pokemon.name.split('-')[0]

    const img = pokemon.sprites.other['official-artwork'].front_default
    const type = getColor(pokemon.types[0].type.name)
    const { flavor_text_entries } = await getSpecie(splitName)
    const info = getInfo(flavor_text_entries)

    const arr = {
      id: pokemon.id,
      name: pokemon.name,
      url: img,
      svg: pokemon.sprites.other.dream_world.front_default,
      color: type,
      types: pokemon.types,
      info,
      all: pokemon
    }

    res.json({ ...arr })
  }
}

const { getAllPokemons, getSpecificPokemon, getImagePokemon, getSpecie } = require('../services/api');
const { getColor, getInfo } = require('../utils/utils');

module.exports = {
  async index(req, res) {
    const { idOrName } = req.params;
    const data = [];
    const re = new RegExp("-")
    const resRegex = re.exec(idOrName)
    let formatedName = idOrName;
    if(resRegex) {
      const [newName] = idOrName.split("-")
      formatedName = newName
    }
    if(idOrName) {
      const pokemon = await getSpecificPokemon(idOrName);
      const img = pokemon.sprites.other["official-artwork"].front_default;
      const type = getColor(pokemon.types[0].type.name);
      console.log(formatedName)
      const { flavor_text_entries } = await getSpecie(formatedName);
      console.log("teste")
      const info = getInfo(flavor_text_entries)

      const arr = [{
        id: pokemon.id,
        name: pokemon.name,
        url: img,
        svg: pokemon.sprites.other.dream_world.front_default,
        color: type,
        types: pokemon.types,
        info,
        all: pokemon,
      }]

      res.json({ data: arr });
    }
    const { results } = await getAllPokemons();

    const promises = results.map(async({name}) => {
      const pokemon = await getSpecificPokemon(name);
      const img = pokemon.sprites.other["official-artwork"].front_default;
      const type = getColor(pokemon.types[0].type.name);
      const { flavor_text_entries } = await getSpecie(pokemon.id);
      const info = getInfo(flavor_text_entries)

      return {
        id: pokemon.id,
        name: pokemon.name,
        url: img,
        svg: pokemon.sprites.other.dream_world.front_default,
        color: type,
        types: pokemon.types,
        info,
        all: pokemon,
      }
    })

    const arr = await Promise.all(promises)

    res.json({ data: arr });
  }
}
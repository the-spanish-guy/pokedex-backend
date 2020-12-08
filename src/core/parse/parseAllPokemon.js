const { getSpecificPokemon } = require('../../services/api');

const parsePokemon = async (name) => {
  try {
    const allPokemon = await getSpecificPokemon(name)
    console.log(allPokemon)
    return allPokemon
    // return {
    //   id = "",
    //   name = "",
    //   url = "",
    //   color = "",
    //   types = "",
    //   all = "",
    // }
  } catch (error) {
    console.log("[ERROR] Error while trying get data", error)
    throw error
  }
}

module.exports = parsePokemon;
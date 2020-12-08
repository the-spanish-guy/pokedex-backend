const axios = require("axios");

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

const getAllPokemons = async () => {
  try {
    const res = await api.get("/pokemon");
    return res.data;
  } catch (error) {
    console.log("[ERROR] error while get list of pokemons ", erorr);
  }
};

const getSpecificPokemon = async (name) => {
  const response = await api.get(`/pokemon/${name}`);
  return response.data;
};

const getCategory = async (nameorId) => {
  const { data } = await api.get(`/pokemon-species/${nameorId}/`);
  const { genera } = data;
  const [gena] = genera
    .filter((gen) => gen.language.name === "en")
    .map((a) => a.genus.split(" ").shift());
  return gena;
};

const getVariant = async (nameorId) => {
  const { data } = await api.get(`/pokemon-species/${nameorId}/`);
  return data.varieties;
};

const getImagePokemon = async (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

const getGenderList = async (id) => {
  const { data } = await api.get(`/gender/${id}`);
  return data;
};

const getSpecie = async (nameorId) => {
  const { data } = await api.get(`/pokemon-species/${nameorId}`);
  return data;
};

const getEggGroups = async (nameorId ) => {
  const { data: { names, id, pokemon_species} } = await api.get(
    `https://pokeapi.co/api/v2/egg-group/${nameorId}`
    );
    const [ name ] = names
    .filter((gen) => gen.language.name === "en")
    .map((a) => a.name)
  return {
    id,
    name,
    pokemon_species
  };
};

const getEvolutions = async (id) => {
  const res = await api.get(`https://pokeapi.co/api/v2/evolution-chain/${id}/`).catch((e) => {
    if(e.response.status) {
      return '';
    }
    console.log("[ERROR] error while get list of pokemons ", e);
    console.log("[ERROR] error while get list of pokemons ", e.response.status);
  })
  return res.data !== '' ? res.data : null;
}

module.exports = {
  getAllPokemons,
  getSpecificPokemon,
  getImagePokemon,
  getCategory,
  getVariant,
  getGenderList,
  getSpecie,
  getEggGroups,
  getEvolutions,
};

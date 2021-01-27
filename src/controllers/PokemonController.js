const {
  getSpecificPokemon,
  getCategory,
  getVariant,
  getGenderList,
  getSpecie,
  getEvolutions,
} = require("../services/api");
const {
  getColor,
  formatHeight,
  formatWeight,
  getVulnarability,
  hasEggGroup,
  getEggGroupsFromated,
  getEvolves,
  capitalize,
  getGenderRate,
  getCatchRate,
  getEffectivetypeByType,
} = require("../utils/utils");

module.exports = {
  async index(req, res) {
    const { id } = req.params;
    const {
      height,
      weight,
      abilities,
      name,
      species,
      types,
      base_experience,
      stats,
      id: pokemonId,
    } = await getSpecificPokemon(id);
    // prevent name with -
    const splitName = name.split("-")[0];

    const category = await getCategory(splitName);

    const other_forms = await getVariant(splitName);
    const male = await getGenderList(1);
    const female = await getGenderList(2);
    const unknow = await getGenderList(3);
    const weakness = getVulnarability(types);
    const typeEffective =
      types.length > 1
        ? getEffectivetypeByType(
            types[0].type.name.toUpperCase(),
            types[1].type.name.toUpperCase()
          )
        : getEffectivetypeByType(types[0].type.name.toUpperCase());

    console.log(types.length);
    console.log(types);
    console.log("passei");
    const {
      base_happiness,
      capture_rate,
      growth_rate,
      egg_groups,
      evolution_chain,
      gender_rate,
    } = await getSpecie(splitName);
    const evolutions = await getEvolutions(evolution_chain);
    let evolves;
    if (evolutions) {
      evolves = getEvolves(evolutions);
    }

    const gender = [];
    female.pokemon_species_details.map(({ pokemon_species }) => {
      if (pokemon_species.name === name) gender.push("female");
      return;
    });
    male.pokemon_species_details.map(({ pokemon_species }) => {
      if (pokemon_species.name === name) gender.push("male");
      return;
    });
    unknow.pokemon_species_details.map(({ pokemon_species }) => {
      if (pokemon_species.name === species.name) gender.push("unknow");
      return;
    });

    //breeding

    const data = {
      poke_data: {
        height: formatHeight(height),
        weight: formatWeight(weight),
        abilities,
        category,
        gender,
        weakness,
      },
      training: {
        catch_rate: getCatchRate(capture_rate),
        base_friendship: base_happiness,
        growth_rate: growth_rate.name,
        base_exp: base_experience,
        ev_yield: stats.filter((r) => r.effort >= 1),
      },
      breeding: {
        egg_groups:
          egg_groups[0].name === "no-eggs"
            ? [{ name: "Undiscovered" }]
            : egg_groups,
        gender_rate: getGenderRate(gender_rate),
      },
      base_stats: stats,
      type: typeEffective,
      evolves: evolves ? evolves : [`${capitalize(name)} dont has evolution`],
      other_forms,
    };

    res.json(data);
  },
};

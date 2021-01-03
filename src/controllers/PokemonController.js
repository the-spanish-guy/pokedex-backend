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
  getCatchRate
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
    } = await getSpecificPokemon(id);
    const re = new RegExp("-")
    const resRegex = re.exec(name)
    let formatedName = id;
    if(resRegex) {
      const [newName] = name.split("-")
      formatedName = newName
    }
    console.log("aqui")
    console.log(formatedName)
    const category = await getCategory(formatedName);
    const other_forms = await getVariant(formatedName);
    const male = await getGenderList(1);
    const female = await getGenderList(2);
    const unknow = await getGenderList(3);
    const weakness = getVulnarability(types);
    const { base_happiness, capture_rate, growth_rate, egg_groups, evolution_chain, gender_rate } = await getSpecie(formatedName);
    const evolutions = await getEvolutions(evolution_chain)
    let evolves;
    if(evolutions) {
      evolves = getEvolves(evolutions)
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
        egg_groups: egg_groups[0].name === 'no-eggs' ? ['Undiscovered'] : egg_groups,
        gender_rate: getGenderRate(gender_rate)
      },
      base_stats: stats,
      type: getVulnarability(types, true),
      evolves: evolves ? evolves : [`${capitalize(name)} dont has evolution`],
      other_forms,
    };

    res.json(data);
  },
};

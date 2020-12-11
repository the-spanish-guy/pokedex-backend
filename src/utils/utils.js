const getColor = (type) => {
  switch (type) {
    case "bug":
      return "#C5DC90";
      break;

    case "dark":
      return "#A7A6AB";
      break;

    case "dragon":
      return "#7FB0E2";
      break;

    case "electric":
      return "#F8EBA1";
      break;

    case "fairy":
      return "#F6C4F1";
      break;

    case "fighting":
      return "#E79BAA";
      break;

    case "fire":
      return "#FCD0A0";
      break;

    case "flying":
      return "#CDDBF5";
      break;

    case "ghost":
      return "#AAB2DB";
      break;

    case "grass":
      return "#ABDCA7";
      break;

    case "ground":
      return "#EBBAA1";
      break;

    case "ice":
      return "#B6E6DE";
      break;

    case "normal":
      return "#CDCECC";
      break;

    case "poison":
      return "#D9ACE5";
      break;

    case "psychic":
      return "#FCBEBD";
      break;

    case "rock":
      return "#E2DBC1";
      break;

    case "steel":
      return "#A6C7CE";
      break;

    case "water":
      return "#A4CBEE";
      break;

    default:
      return "#FF0000";
      break;
  }
};

const getTypeIconColor = (type) => {
  switch (type) {
    case "bug":
      return "#92BD2D";
      break;

    case "dark":
      return "#595761";
      break;

    case "dragon":
      return "#0C6AC8";
      break;

    case "electric":
      return "#F2D94E";
      break;

    case "fairy":
      return "#EF90E6";
      break;

    case "fighting":
      return "#D3425F";
      break;

    case "fire":
      return "#FBA64C";
      break;

    case "flying":
      return "#A1BBEC";
      break;

    case "ghost":
      return "#5F6DBC";
      break;

    case "grass":
      return "#60BD58";
      break;

    case "ground":
      return "#DA7C4D";
      break;

    case "ice":
      return "#76D1C1";
      break;

    case "normal":
      return "#A0A29F";
      break;

    case "poison":
      return "#B763CF";
      break;

    case "psychic":
      return "#FA8582";
      break;

    case "rock":
      return "#C9BC8A";
      break;

    case "steel":
      return "#5795A3";
      break;

    case "water":
      return "#539DDF";
      break;

    default:
      return "#FF0000";
      break;
  }
};

const formatNumber = (number) => {
  const n = number.toString().length;
  switch (n) {
    case 1:
      return `#00${number}`;

    case 2:
      return `#0${number}`;

    default:
      return `#${number}`;
  }
};

const formatHeight = (number) => {
  const n = number.toString().length;
  switch (n) {
    case 1:
      return `0.${number} m`;

    case 2:
      const num = number.toString().split("");
      return `${num[0]}.${num[1]} m`;

    default:
      return `${number} m`;
  }
};

const formatWeight = (number) => {
  const n = number.toString().length;
  switch (n) {
    case 1:
      return `0.${number} kg`;

    case 2:
      var num = number.toString().split("");
      return `${num[0]}.${num[1]} kg`;

    case 3:
      var num = number.toString().split("");
      return `${num[0]}${num[1]}.${num[2]} kg`;

    default:
      var num = number.toString().split("");
      return `${num[0]}${num[1]}${num[2]}.${num[3]} kg`;
  }
};

const getEffectiveByType = (type) => {
  switch (type) {
    case "bug":
      return {
        vulnerability: ["flying", "rock", "fire"],
        resistent: ["fighting", "ground", "grass"],
      };
    case "dark":
      return {
        vulnerability: ["fighting", "bug", "fairy"],
        resistent: ["ghost", "psychic", "dark"],
      };
    case "dragon":
      return {
        vulnerability: ["ice", "dragon", "fairy"],
        resistent: ["fire", "water", "grass", "electric"],
      };
    case "electric":
      return {
        vulnerability: ["ground"],
        resistent: ["flying", "steel", "electric"],
      };
    case "fairy":
      return {
        vulnerability: ["poison", "steel"],
        resistent: ["flying", "bug", "dragon", "dark"],
      };
    case "fighting":
      return {
        vulnerability: ["flying", "psychic", "fairy"],
        resistent: ["rock", "bug", "dark"],
      };
    case "fire":
      return {
        vulnerability: ["ground", "rock", "water"],
        resistent: ["bug", "steel", "fire", "grass", "ice"],
      };
    case "flying":
      return {
        vulnerability: ["rock", "electric", "ice"],
        resistent: ["fighting", "ground", "bug", "fairy"],
      };
    case "ghost":
      return {
        vulnerability: ["ghost", "dark"],
        resistent: ["normal", "fighting", "poison", "bug"],
      };
    case "grass":
      return {
        vulnerability: ["flying", "poison", "bug", "fire", "ice"],
        resistent: ["ground", "water", "grass", "electric"],
      };
    case "ground":
      return {
        vulnerability: ["water", "grass", "ice"],
        resistent: ["poison", "rock", "electric"],
      };
    case "ice":
      return {
        vulnerability: ["fighting", "rock", "steel", "fire"],
        resistent: ["ice"],
      };
    case "normal":
      return {
        vulnerability: ["fighting"],
        resistent: ["ghost"],
      };
    case "poison":
      return {
        vulnerability: ["ground", "psychic"],
        resistent: ["fighting", "poison", "grass", "fairy"],
      };
    case "psychic":
      return {
        vulnerability: ["grass", "ghost", "dark"],
        resistent: ["fighting", "psychic"],
      };
    case "rock":
      return {
        vulnerability: ["fighting", "ground", "steel", "water", "grass"],
        resistent: ["normal", "flying", "poison", "fire"],
      };
    case "steel":
      return {
        vulnerability: ["fighting", "ground", "fire"],
        resistent: [
          "normal",
          "flying",
          "poison",
          "rock",
          "bug",
          "steel",
          "grass",
          "psychic",
          "ice",
          "dragon",
          "fairy",
        ],
      };
    case "water":
      return {
        vulnerability: ["grass", "electric"],
        resistent: ["steel", "fire", "water", "ice"],
      };

    default:
      break;
  }
};

const getVulnarability = (type ,returnAll = null) => {
  let vulnerabilidade = [],
    resistencia = [];

  type.map(({ type: t }) => {
    const { vulnerability: v, resistent: r } = getEffectiveByType(t.name);
    vulnerabilidade.push(...v);
    resistencia.push(...r);
  });

  const weak = [];
  vulnerabilidade.map((v) => {
    if (!resistencia.includes(v)) {
      weak.push(v);
    }
  });
  const weakness = weak.filter((este, i) => weak.indexOf(este) === i);

  if(returnAll) {
    const res = [];
    weakness.map((we) => {
      res.push({
        name_type: we,
        effective: 2
      })
    })
    resistencia.map((r) => {
      res.push({name_type: r, effective: "1/2"})
    })

    return res;
  }

  return weakness;
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const hasEggGroup = (egg_groups, groupName, name) => {
  let result = null;
  egg_groups.map((group) => {
    group.name === name ? result = groupName : "";
  });
  return result;
};

const getEggGroupsFromated = (groups, name) => {
  const res = [];
  groups.map((group) => {
    const has = hasEggGroup(group.pokemon_species, group.name, name)
    if(has) res.push(has)
  })
  return res;
}

const getEvolves = (data) => {
  const { id, chain } = data
  const getMinLevel = (arr) => arr.map((l) => l.min_level)
  const getIdForImg = (str) => {
    const s = str.split('species/').pop()
    const id = s.split('/').shift()
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  }
  const result = [
    {
      name: chain.species.name,
      min_level: '',
      url: getIdForImg(chain.species.url)
    }
  ];
  const evolves = (arr) => {
    arr.map((e) => {
      const [minLevel] = getMinLevel(e.evolution_details)
      result.push({
        name: e.species.name,
        min_level: minLevel,
        url: getIdForImg(e.species.url)
      })
      evolves(e.evolves_to)
    })
  }
  evolves(chain.evolves_to)
  return result;
}

const getInfo = arr => {
  const description = arr
    .filter((desc) => desc.language.name === "en")
    .sort((a, b) => a.version.url - b.version.url)
    .slice(-1);
  return description[0].flavor_text;
}

module.exports = {
  getColor,
  formatNumber,
  getTypeIconColor,
  capitalize,
  formatHeight,
  formatWeight,
  getVulnarability,
  hasEggGroup,
  getEggGroupsFromated,
  getEvolves,
  getInfo
};

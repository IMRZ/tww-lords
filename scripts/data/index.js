
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const xmlParser = require("fast-xml-parser");

function getPathToWh2Dir() {
  const pathToEnvarsLocal = path.resolve(__dirname, "../../.env.local");
  const result = dotenv.config({ path: pathToEnvarsLocal });
  if (result.error) {
    throw new Error(result.error);
  } else {
    return process.env.PATH_TO_WH2_DIR;
  }
}

function parseXmlFile(pathToWh2Dir, dataTag, dataPath) {
  const filePath = path.resolve(pathToWh2Dir, dataPath);
  const xmlFile = fs.readFileSync(filePath, "utf8");
  const result = xmlParser.parse(xmlFile);
  return result.dataroot[dataTag];
}

function transformBulletpoints(bulletpoints) {
  return bulletpoints
    .split("||")
    .map((line) => line.split(/(\[\[.*?\[\[\/img\]\])/g))
    .map((parts) => {
      return parts
        .filter((part) => part !== "")
        .map((part) => {
          if (part.startsWith("[[img:")) {
            const [fullMatch, imagePath] = part.match(/^\[\[img:(.*)\]\]\[\[\/img]]$/);
            const [icon, fileExtension] = imagePath.replace(/ui\/skins\/default\/|ui\/battle ui\/ability_icons\//, "").split(".");
            return { "icon": icon };
          } else {
            return { "text": part };
          }
        });
    });
}

function transformCustomLoadingScreenComponents(custom_loading_screen_components) {
  return custom_loading_screen_components
    .filter((entry) => entry.component_id === "custom_quote")
    .map((entry) => {
      return {
        key: entry.custom_loading_screen_key,
        text: entry.localised_text
      };
    });
}

function transformFactionPoliticalPartiesJunctions(faction_political_parties_junctions) {
  return faction_political_parties_junctions.map((entry) => {
    return {
      factionKey: entry.faction_key,
      politicalPartyKey: entry.political_party_key
    };
  });
}

function transformFrontendFactionLeaders(frontend_faction_leaders) {
  return frontend_faction_leaders.map((entry) => {
    const [fullMatch, character_image] = entry.character_image.match(/^.*\\(.*).png$/);
    return {
      key: entry.key,
      characterImage: character_image,
      description: entry.localised_description,
      difficulty: entry.difficulty
    };
  });
}

function transformFrontendFactions(frontend_factions) {
  return frontend_factions.map((frontendFaction) => {
    return {
      faction: frontendFaction.faction,
      bulletpoints: transformBulletpoints(frontendFaction.localised_mechanics),
      playstyle: frontendFaction.localised_playstyle
    };
  });
}

function transformLoadingScreenQuotes(loading_screen_quotes) {
  return loading_screen_quotes
    .filter((loadingScreenQuote) => loadingScreenQuote.category === "generic")
    .map((loadingScreenQuote) => {
      return {
        key: loadingScreenQuote.key,
        title: loadingScreenQuote.title,
        description: loadingScreenQuote.description,
        bulletpoints: transformBulletpoints(loadingScreenQuote.bulletpoints),
      };
    });
}

function transformStartPosStartingGeneralOptions(start_pos_starting_general_options) {
  return start_pos_starting_general_options.map((entry) => {
    console.log(entry);

    return {
      frontend_faction_leader:
      general,
      replaces_general,
      effect_bundle
    };
  });
}

function extract() {
  const pathToWh2Dir = getPathToWh2Dir();
  const data = {
    custom_loading_screen_components: "assembly_kit/raw_data/db/custom_loading_screen_components.xml",
    faction_political_parties_junctions: "assembly_kit/raw_data/db/faction_political_parties_junctions.xml",
    factions: "assembly_kit/raw_data/db/factions.xml",
    frontend_faction_leaders: "assembly_kit/raw_data/db/frontend_faction_leaders.xml",
    frontend_factions: "assembly_kit/raw_data/db/frontend_factions.xml",
    loading_screen_quotes: "assembly_kit/raw_data/db/loading_screen_quotes.xml",
    start_pos_characters: "assembly_kit/raw_data/db/start_pos_characters.xml",
    start_pos_factions: "assembly_kit/raw_data/db/start_pos_factions.xml",
    start_pos_starting_general_options: "assembly_kit/raw_data/db/start_pos_starting_general_options.xml",
  };

  const [
    custom_loading_screen_components,
    faction_political_parties_junctions,
    frontend_faction_leaders,
    frontend_factions,
    loading_screen_quotes,
    start_pos_starting_general_options
  ] = Object.entries(data).map(([dataTag, dataPath]) => parseXmlFile(pathToWh2Dir, dataTag, dataPath));

  const customLoadingScreenComponents = transformCustomLoadingScreenComponents(custom_loading_screen_components);
  const factionPoliticalPartiesJunctions = transformFactionPoliticalPartiesJunctions(faction_political_parties_junctions);
  const frontendFactionLeaders = transformFrontendFactionLeaders(frontend_faction_leaders);
  const frontendFactions = transformFrontendFactions(frontend_factions);
  const loadingScreenQuotes = transformLoadingScreenQuotes(loading_screen_quotes);
  const startPosStartingGeneralOptions = transformStartPosStartingGeneralOptions(start_pos_starting_general_options);

  // console.log(frontendFactionLeaders);
  // console.log(frontendFactions);
  // console.log(frontend_faction_leaders);
  // console.log(faction_political_parties_junctions);

  // general
  // Mortal Empires:main_warhammer:The Empire:wh_main_emp_empire:2120135926:m:Empire names:names_emp_empire:89:the Grim:family_name:2147358014:m:Empire names:names_emp_empire:89:Volkmar:forename:2147358013:2140784136

  return frontendFactionLeaders.reduce((accumulator, factionLeader) => {
    // const factionKey = factionPoliticalPartiesJunctions.find(junction => junction.politicalPartyKey === factionLeader.key);

    // console.log(factionLeader.key, factionKey);

    accumulator[factionLeader.key] = {
      key: factionLeader.key,
      difficulty: factionLeader.difficulty,
      characterImage: factionLeader.characterImage,
      description: factionLeader.description,
      // faction: factionKey
    };

    return accumulator;
  }, {});
}

extract();

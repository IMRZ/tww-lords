
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const fsExtra = require("fs-extra");
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
            return { type: "icon", data: icon };
          } else {
            const text = part.replace(/&amp;/g, "&").replace(/\[\[\/col\]\]/g, "");
            return { type: "text", data: text };
          }
        });
    });
}

function transformDescription(description) {
  return description
    .split("\\n\\n")
    .map((part) => {
      if (part.startsWith("&quot;")) {
        return { type: "quote", text: part.replace(/&quot;/g, "") };
      } else {
        return { type: "paragraph", text: part };
      }
    });
}

function transformName(forename, surname) {
  if (surname && surname.name) {
    return `${forename.name} ${surname.name}`;
  } else {
    return forename.name;
  }
}

function extract() {
  const pathToWh2Dir = getPathToWh2Dir();

  const xmlData = {
    agent_subtypes: "assembly_kit/raw_data/db/agent_subtypes.xml",
    factions: "assembly_kit/raw_data/db/factions.xml",
    frontend_faction_leaders: "assembly_kit/raw_data/db/frontend_faction_leaders.xml",
    frontend_factions: "assembly_kit/raw_data/db/frontend_factions.xml",
    loading_screen_quotes: "assembly_kit/raw_data/db/loading_screen_quotes.xml",
    loading_screen_quotes_to_units: "assembly_kit/raw_data/db/loading_screen_quotes_to_units.xml",
    names: "assembly_kit/raw_data/db/names.xml",
    start_pos_characters: "assembly_kit/raw_data/db/start_pos_characters.xml",
    start_pos_factions: "assembly_kit/raw_data/db/start_pos_factions.xml",
    start_pos_starting_general_options: "assembly_kit/raw_data/db/start_pos_starting_general_options.xml",
  };

  const jsonData = Object.entries(xmlData).map(([dataTag, dataPath]) => {
    return parseXmlFile(pathToWh2Dir, dataTag, dataPath);
  });

  const [
    agent_subtypes,
    factions,
    frontend_faction_leaders,
    frontend_factions,
    loading_screen_quotes,
    loading_screen_quotes_to_units,
    names,
    start_pos_characters,
    start_pos_factions,
    start_pos_starting_general_options,
  ] = jsonData;

  return frontend_faction_leaders.reduce((accumulator, frontendFactionLeader) => {
    const startPosStartingGeneralOptions = start_pos_starting_general_options.find(entry => entry.frontend_faction_leader === frontendFactionLeader.key);
    const startPosCharacter = start_pos_characters.find(entry => entry.ID === startPosStartingGeneralOptions.general);
    const agentSubType = agent_subtypes.find(entry => entry.key === startPosCharacter.subtype);
    const startPosFaction = start_pos_factions.find(entry => entry.ID === startPosCharacter.faction);
    const faction = factions.find(entry => entry.key === startPosFaction.faction);
    const frontendFaction = frontend_factions.find(entry => entry.faction === faction.key);
    const loadingScreenQuotesToUnit = loading_screen_quotes_to_units.find(entry => entry.unit === agentSubType.associated_unit_override);
    const loadingScreenQuote = loading_screen_quotes.find(entry => entry.key === loadingScreenQuotesToUnit.quote);
    const forename = names.find(entry => entry.id === startPosCharacter.Name);
    const surname = names.find(entry => entry.id === startPosCharacter.Surname);

    accumulator[frontendFactionLeader.key] = {
      key: frontendFactionLeader.key,
      difficulty: frontendFactionLeader.difficulty,
      character_image: frontendFactionLeader.character_image.match(/^.*\\(.*).png$/)[1].toLowerCase(),
      localised_description: transformDescription(frontendFactionLeader.localised_description),
      // description: startPosFaction.description, // PLACEHOLDER?
      // long_description: startPosFaction.long_description, // PLACEHOLDER?
      faction: faction.key,
      factionFlag: faction.flags_path.toLowerCase().match(/^ui\\flags\\(.*)$/)[1],
      military_group: faction.military_group,
      screen_name: faction.screen_name,
      character_name: transformName(forename, surname),
      // localised_playstyle: frontendFaction.localised_playstyle, // EMPTY?
      quote: loadingScreenQuote.description,
      localised_mechanics: transformBulletpoints(frontendFaction.localised_mechanics),
      bulletpoints: transformBulletpoints(loadingScreenQuote.bulletpoints)
    };

    return accumulator;
  }, {});
}

fsExtra.outputJSONSync(path.resolve(__dirname, "../../src/store/lords.json"), extract(), { spaces: 2 });

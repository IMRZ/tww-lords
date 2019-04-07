const fs = require("fs");
const path = require("path");

const ICONS_PATH = path.resolve(__dirname, "../src/assets/faction_bullets");

function generateScssFactionBullets() {
  const files = fs.readdirSync(ICONS_PATH);

  const formatted = files.reduce((accumulator, fileName) => {
    const [name, extension] = fileName.split(".");
    accumulator += `  "${name}"\n`;
    return accumulator;
  }, "");

  // Do not format this template string! This generates pretty scss :)
  const result = `/* generated on ${new Date().toISOString()} - do not modify! */

\$faction-bullets:
${formatted};
`;

  fs.writeFileSync(path.resolve(__dirname, "../src/scss/faction-bullets.scss"), result);
}

generateScssFactionBullets();

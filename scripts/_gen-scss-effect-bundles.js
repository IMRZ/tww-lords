const fs = require("fs");
const path = require("path");

function isDir(path) {
  return fs.lstatSync(path).isDirectory();
}

const ICONS_PATH = path.resolve(__dirname, "../src/assets/effect_bundles");

function generateScss() {
  const files = fs.readdirSync(ICONS_PATH).filter(file => isDir(path.resolve(__dirname, `../src/assets/effect_bundles/${file}`)) === false);

  const formatted = files.reduce((accumulator, fileName) => {
    const [name, extension] = fileName.split(".");
    accumulator += `  "${name}"\n`;
    return accumulator;
  }, "");

  // Do not format this template string! This generates pretty scss :)
  const result = `/* generated on ${new Date().toISOString()} - do not modify! */

\$effect_bundles:
${formatted};
`;

  fs.writeFileSync(path.resolve(__dirname, "../src/scss/effect_bundles.scss"), result);
}

generateScss();

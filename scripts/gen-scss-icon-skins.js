const fs = require("fs");
const path = require("path");

const skinsPath = path.resolve(__dirname, "../src/assets/icons/skins");

function isDir(path) {
  return fs.lstatSync(path).isDirectory();
}

function generateScssSkins() {
  const files = fs.readdirSync(skinsPath);
  const skinsDirs = files.filter(file => isDir(`${skinsPath}/${file}`));

  const formattedIcons = skinsDirs.reduce((accumulator, skinDirName) => {
    const iconGroup = fs.readdirSync(`${skinsPath}/${skinDirName}`).reduce((accumulator, fileName) => {
      const [name, extension] = fileName.split(".");
      accumulator += `  "${name}"\n`;
      return accumulator;
    }, "");

    accumulator += `
\$${skinDirName}:
${iconGroup};
`;
    return accumulator;
  }, "");

  const result = `/* generated on ${new Date().toISOString()} - do not modify! */
${formattedIcons}`;

  fs.writeFileSync(path.resolve(__dirname, "../src/scss/skins.scss"), result);
}

generateScssSkins();

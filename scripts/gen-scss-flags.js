const fs = require("fs");
const path = require("path");

const flagsPath = path.resolve(__dirname, "../src/assets/flags");

function isDir(path) {
  return fs.lstatSync(path).isDirectory();
}

function generateScssFlags() {
  const files = fs.readdirSync(flagsPath);

  const flagNames = files.filter(file => isDir(`${flagsPath}/${file}`));

  const formattedFlagNames = flagNames.reduce((accumulator, flagDirName) => {
    accumulator += `  "${flagDirName}"\n`;
    return accumulator;
  }, "");

  // Do not format this template string! This generates pretty scss :)
  const result = `/* generated on ${new Date().toISOString()} - do not modify! */

\$flags:
${formattedFlagNames};
`;

  fs.writeFileSync(path.resolve(__dirname, "../src/scss/flags.scss"), result);
}

generateScssFlags();

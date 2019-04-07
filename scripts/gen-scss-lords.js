const fs = require("fs");
const path = require("path");

const lordsPath = path.resolve(__dirname, "../src/assets/lords");

function generateScssLords() {
  const files = fs.readdirSync(lordsPath);

  const formattedLordNames = files.reduce((accumulator, fileName) => {
    const [name, extension] = fileName.split(".");
    accumulator += `  "${name}"\n`;
    return accumulator;
  }, "");

  // Do not format this template string! This generates pretty scss :)
  const result = `/* generated on ${new Date().toISOString()} - do not modify! */
\$lords:
${formattedLordNames};
`;

  fs.writeFileSync(path.resolve(__dirname, "../src/scss/lords.scss"), result);
}

generateScssLords();

const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "src/assets/lords");

const files = fs.readdirSync(filePath)

files.forEach((fileName) => {
  const [name, extension] = fileName.split(".");
  console.log(`require("@/assets/lords/${name}"),`);
});

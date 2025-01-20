const { writeFileSync, existsSync, mkdirSync } = require("fs");
const { join } = require("path");

// tslint:disable-next-line no-var-requires
const i18n = require("../.translations/data.json");

const langs = Object.keys(i18n);

const dir = join(__dirname, "..", "dist");

if (!existsSync(dir)) {
  mkdirSync(dir);
}

for (const lang of langs) {
  const fileContent = JSON.stringify(i18n[lang], null, 2);
  const filePath = join(__dirname, "..", "dist", `i18n.${lang}.json`);

  writeFileSync(filePath, fileContent, "utf-8");
}

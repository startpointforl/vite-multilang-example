interface Translations {
  [keyset: string]: {
    [key: string]: string;
  };
}

// https://stackoverflow.com/questions/67822238/how-to-import-a-json-file-using-vite-dynamicly

// const translations = require(`../../../dist/i18n.${process.env.BEM_LANG}.json`);
const modules = import.meta.glob("../../../dist/i18n.*.json", {
  eager: true,
});

const translations = modules[
  `../../../dist/i18n.${import.meta.env.VITE_LANG}.json`
] as Translations;

function createI18NFunctions(translations: Translations) {
  return ({ keyset, key }: { keyset: string; key: string }) => {
    return translations[keyset][key];
  };
}

const i18n = createI18NFunctions(translations);

export default i18n;

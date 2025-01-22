interface Translations {
  [keyset: string]: {
    [key: string]: string;
  };
}

// https://stackoverflow.com/questions/67822238/how-to-import-a-json-file-using-vite-dynamicly

// imported dist/i18n.en.json and dist/i18n.ru.json together
const modules = import.meta.glob("../../../../dist/i18n.*.json", {
  eager: true,
});

const el = document.querySelector('meta[name="render-params"]');
const data = JSON.parse(el?.getAttribute("content") || "{}");

const translations = modules[
  `../../../../dist/i18n.${data.LANG}.json`
] as Translations;

function createI18NFunctions(translations: Translations) {
  return ({ keyset, key }: { keyset: string; key: string }) => {
    return (
      translations[keyset]?.[key] ||
      `Missing keyset "${keyset}" and key "${key}"`
    );
  };
}

export const i18nWithAllLang = createI18NFunctions(translations);

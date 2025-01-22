interface Translations {
  [keyset: string]: {
    [key: string]: string;
  };
}

const translationsStr = `__buildI18nJson`;
let translations = {};
try {
  translations = JSON.parse(translationsStr) as Translations;
} catch {
  translations = {};
}

function createI18NFunctions(translations: Translations) {
  return ({ keyset, key }: { keyset: string; key: string }) => {
    return (
      translations[keyset]?.[key] ||
      `Missing keyset "${keyset}" and key "${key}"`
    );
  };
}

export const i18nWithEntryPoints = createI18NFunctions(translations);

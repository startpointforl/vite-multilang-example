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
    return translations[keyset][key];
  };
}

export const i18nStatic = createI18NFunctions(translations);

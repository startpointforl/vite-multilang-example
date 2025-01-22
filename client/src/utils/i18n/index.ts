import { i18nWithAllLang } from "./i18nWithAllLangImport";
import { i18nWithEntryPoints } from "./i18nWithEntryPointsImport";

/**
 * for just all lang import
 * export const i18n = i18nWithAllLang;
 */

export const i18n = import.meta.env.DEV ? i18nWithAllLang : i18nWithEntryPoints;

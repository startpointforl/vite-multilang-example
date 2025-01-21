import { i18nGynamic } from "./i18nGynamicImport";
import { i18nStatic } from "./i18nStaticImport";

export const i18n = import.meta.env.DEV ? i18nGynamic : i18nStatic;

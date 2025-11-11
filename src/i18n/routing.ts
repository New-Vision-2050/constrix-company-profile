import { defineRouting } from "next-intl/routing";
import { i18nGlobalConfig } from "./global-config";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: i18nGlobalConfig.locales,

  // Used when no locale matches
  defaultLocale: i18nGlobalConfig.defaultLocale,
});

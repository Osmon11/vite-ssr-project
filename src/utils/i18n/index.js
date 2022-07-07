import { createI18n } from "vue-i18n";
import messages from "./localization.json";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "ru",
  messages,
});

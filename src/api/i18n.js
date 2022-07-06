import { createI18n } from "vue-i18n";

const messages = {
  en: { hello: "Hello wordl" },
  ru: { hello: "Привет мир" },
};

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "ru",
  messages,
});

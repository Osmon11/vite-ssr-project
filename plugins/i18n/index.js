import { createI18n } from "vue-i18n";
import en from "./en.json";
import ru from "./ru.json";

const i18n = createI18n({
  legacy: false,
  locale: import.meta.env.VITE_PRIMARY_LANGUAGE,
  fallbackLocale: import.meta.env.VITE_SECONDARY_LANGUAGE,
  messages: {
    en,
    ru,
  },
});

export default { i18n };

import { createI18n } from "vue-i18n";
import en from "./en.json";
import ru from "./ru.json";

type MessageSchema_en = typeof en;
type MessageSchema_ru = typeof ru;

export default createI18n<
  [MessageSchema_en, MessageSchema_ru],
  "en" | "ru"
>({
  legacy: false,
  allowComposition: true,
  locale: import.meta.env.VITE_PRIMARY_LANGUAGE,
  fallbackLocale: import.meta.env
    .VITE_SECONDARY_LANGUAGE,
  messages: {
    en: en,
    ru: ru,
  },
});

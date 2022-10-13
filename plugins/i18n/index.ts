import { createI18n } from "vue-i18n";
import en from "./en.json";
import ru from "./ru.json";

type MessageSchema_en_US = typeof en;
type MessageSchema_ru_RF = typeof ru;

export default createI18n<
  [MessageSchema_en_US, MessageSchema_ru_RF],
  "en-US" | "ru-RF"
>({
  allowComposition: true,
  locale: import.meta.env.VITE_PRIMARY_LANGUAGE,
  fallbackLocale: import.meta.env.VITE_SECONDARY_LANGUAGE,
  messages: {
    "en-US": en,
    "ru-RF": ru,
  },
});

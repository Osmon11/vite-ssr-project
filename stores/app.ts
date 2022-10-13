import { defineStore } from "pinia";
import { IAppStoreState, ILanguages } from "./app.types";

const storeDefaults: IAppStoreState = {
  token: null,
  languages: {
    primary: import.meta.env.VITE_PRIMARY_LANGUAGE,
    secondary: import.meta.env.VITE_SECONDARY_LANGUAGE,
  },
};

export const useAppStore = defineStore("app", {
  state(): IAppStoreState {
    return { ...storeDefaults };
  },
  getters: {
    isAdmin(): boolean {
      return Boolean(this.token);
    },
    getLanguages(): ILanguages {
      return this.languages;
    },
  },
});

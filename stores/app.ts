import { defineStore } from "pinia";
import {
  IAppStoreState,
  ILanguages,
} from "./app.types";

export const useAppStore = defineStore("app", {
  state(): IAppStoreState {
    return {
      token: null,
      languages: {
        primary: import.meta.env
          .VITE_PRIMARY_LANGUAGE,
        secondary: import.meta.env
          .VITE_SECONDARY_LANGUAGE,
      },
    };
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

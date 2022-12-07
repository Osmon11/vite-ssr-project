import { defineStore } from "pinia";
import {
  IAppStoreState,
  ILanguages,
  IAlert,
  IPromp,
} from "./app.types";

export const useAppStore = defineStore("app", {
  state(): IAppStoreState {
    return {
      languages: {
        primary: import.meta.env
          .VITE_PRIMARY_LANGUAGE,
        secondary: import.meta.env
          .VITE_SECONDARY_LANGUAGE,
      },
      alert: {
        type: null,
        message: null,
      },
      promp: {
        confirm: null,
        reject: null,
        message: null,
      },
    };
  },
  getters: {
    getLanguages(): ILanguages {
      return this.languages;
    },
    getAlert(): IAlert {
      return this.alert;
    },
    getPromp(): IPromp {
      return this.promp;
    },
  },
  actions: {
    // SET
    setAlert(alert: IAlert) {
      this.alert = alert;
    },
    setPromp(promp: IPromp) {
      this.promp = promp;
    },
  },
});

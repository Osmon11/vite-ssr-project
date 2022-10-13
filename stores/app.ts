import { defineStore } from "pinia";
import { IAppStoreState } from "./app.types";

const storeDefaults: IAppStoreState = { token: null };

export const useAppStore = defineStore("app", {
  state(): IAppStoreState {
    return { ...storeDefaults };
  },
  getters: {
    isAdmin(): boolean {
      return Boolean(this.token);
    },
  },
});

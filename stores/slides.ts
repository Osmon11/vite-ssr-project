import { defineStore } from "pinia";

export const useSlidesStore = defineStore("slides", {
  state() {
    return { test: "test" };
  },
});

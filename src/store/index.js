import { defineStore } from "pinia";

import { makeRequest } from "../api";
import { getUrlString } from "../utils";

export const useStore = defineStore("main", {
  state: () => ({
    admin: {},
    slides: [],
    news: [],
    alert: {
      severity: "success",
      message: "Hi there",
    },
    promp: {
      confirm: () => "Yep",
      reject: () => "Nope",
      message: "Hello there",
    },
  }),
  actions: {
    setAlert(alert) {
      this.alert = alert;
    },
    setPromp(promp) {
      this.promp = { ...this.promp, ...promp };
    },
    getSlides(query = {}) {
      makeRequest(`/slides?${getUrlString(query)}`, "get").then((json) => {
        if (json) {
          this.slides = json;
        }
      });
    },
    setSlide(data) {
      makeRequest("/slides", "post", data).then((json) => {
        if (json) {
          this.slides = json;
        }
      });
    },
    updateSlide(query, data) {
      makeRequest(`/slides?${getUrlString(query)}`, "update", data).then(
        (json) => {
          if (json) {
            this.slides = json;
          }
        }
      );
    },
    deleteSlide(query) {
      makeRequest(`/slides?${getUrlString(query)}`, "delete").then((json) => {
        if (json) {
          this.slides = json.data;
        }
      });
    },
  },
});

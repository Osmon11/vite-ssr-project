import { defineStore } from "pinia";

import { makeRequest } from "../api";
import { getUrlString } from "../utils";

export const useStore = defineStore("main", {
  state: () => ({
    admin: {},
    slides: [],
    slide: {},
    newsFeed: [],
    news: {},
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
    getSlides(query = {}, callback = () => {}) {
      makeRequest(`/slides?${getUrlString(query)}`, "get").then((json) => {
        if (json) {
          if (query.id) {
            this.slide[query.id] = json;
          } else {
            this.slides = json;
          }
        }
        callback(Boolean(json));
      });
    },
    setSlide(data) {
      makeRequest("/slides", "post", data).then((json) => {
        if (json) {
          this.slides = json;
        }
      });
    },
    updateSlide(query = {}, data) {
      makeRequest(`/slides?${getUrlString(query)}`, "put", data).then(
        (json) => {
          if (json) {
            this.slides = json.data;
          }
        }
      );
    },
    deleteSlide(query = {}) {
      makeRequest(`/slides?${getUrlString(query)}`, "delete").then((json) => {
        if (json) {
          this.slides = json.data;
        }
      });
    },
    getNewsFeed(query = {}, callback = () => {}) {
      makeRequest(`/news-feed?${getUrlString(query)}`, "get").then((json) => {
        if (json) {
          if (query.id) {
            this.news[query.id] = json;
          } else {
            this.newsFeed = json;
          }
        }
        callback(Boolean(json));
      });
    },
    setNews(data) {
      makeRequest("/news-feed", "post", data).then((json) => {
        if (json) {
          this.newsFeed = json;
        }
      });
    },
    updateNews(query = {}, data) {
      makeRequest(`/news-feed?${getUrlString(query)}`, "post", data).then(
        (json) => {
          if (json) {
            this.newsFeed = json;
          }
        }
      );
    },
  },
});

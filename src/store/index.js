import moment from "moment";
import cookie_js from "cookie_js";
import { defineStore } from "pinia";

import { getUrlString } from "../utils";
import { appAxios, makeRequest } from "../api";

export const useStore = defineStore("main", {
  state: () => ({
    admin: {},
    slides: [],
    slide: {},
    newsFeed: [],
    shariahBoard: [],
    partners: [],
    partner: {},
    services: [],
    service: {},
    employee: {},
    news: {},
    currentNews: {},
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
    authorize(data, remember = false, callback = () => {}) {
      makeRequest("/auth/login", "post", data).then((json) => {
        if (json) {
          let bearerToken = `Bearer ${json.token}`;
          cookie_js.set(import.meta.env.VITE_TOKEN_KEY, bearerToken, {
            expires: new Date(
              moment().add(1, "day").toLocaleString()
            ).toUTCString(),
            path: "/",
          });
          appAxios.defaults.headers["authorization"] = bearerToken;
          this.admin = json;
        }
        callback(Boolean(json));
      });
    },
    logout() {
      cookie_js.removeSpecific(import.meta.env.VITE_TOKEN_KEY, { path: "/" });
      appAxios.defaults.headers["authorization"] = null;
    },
    getUserInfo() {
      makeRequest("/user/info", "get").then((json) => {
        if (json) {
          this.admin = json;
        }
      });
    },
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
    setSlide(data, callback = () => {}) {
      makeRequest("/slides", "post", data).then((json) => {
        if (json) {
          this.slides = json;
        }
        callback(Boolean(json));
      });
    },
    updateSlide(query = {}, data, callback = () => {}) {
      makeRequest(`/slides?${getUrlString(query)}`, "put", data).then(
        (json) => {
          if (json) {
            this.slides = json.data;
          }
          callback(Boolean(json));
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
    setNews(data, callback = () => {}) {
      makeRequest("/news-feed", "post", data).then((json) => {
        if (json) {
          this.newsFeed = json;
        }
        callback(Boolean(json));
      });
    },
    updateNews(query = {}, data, callback = () => {}) {
      makeRequest(`/news-feed?${getUrlString(query)}`, "put", data).then(
        (json) => {
          if (json) {
            this.newsFeed = json.data;
          }
          callback(Boolean(json));
        }
      );
    },
    deleteNews(query = {}) {
      makeRequest(`/news-feed?${getUrlString(query)}`, "delete").then(
        (json) => {
          if (json) {
            this.newsFeed = json.data;
          }
        }
      );
    },
    getShariahBoard(query = {}, callback = () => {}) {
      makeRequest(`/shariah-board?${getUrlString(query)}`, "get").then(
        (json) => {
          if (json) {
            if (query.id) {
              this.employee[query.id] = json;
            } else {
              this.shariahBoard = json;
            }
          }
          callback(Boolean(json));
        }
      );
    },
    setEmployee(data, callback = () => {}) {
      makeRequest("/shariah-board", "post", data).then((json) => {
        if (json) {
          this.shariahBoard = json;
        }
        callback(Boolean(json));
      });
    },
    updateEmployee(query = {}, data, callback = () => {}) {
      makeRequest(`/shariah-board?${getUrlString(query)}`, "put", data).then(
        (json) => {
          if (json) {
            this.shariahBoard = json.data;
          }
          callback(Boolean(json));
        }
      );
    },
    deleteEmployee(query = {}) {
      makeRequest(`/shariah-board?${getUrlString(query)}`, "delete").then(
        (json) => {
          if (json) {
            this.shariahBoard = json.data;
          }
        }
      );
    },
    getPartnersList(query = {}, callback = () => {}) {
      makeRequest(`/partners?${getUrlString(query)}`, "get").then((json) => {
        if (json) {
          if (query.id) {
            this.partner[query.id] = json;
          } else {
            this.partners = json;
          }
        }
        callback(Boolean(json));
      });
    },
    setPartner(data, callback = () => {}) {
      makeRequest("/partners", "post", data).then((json) => {
        if (json) {
          this.partners = json;
        }
        callback(Boolean(json));
      });
    },
    updatePartner(query = {}, data, callback = () => {}) {
      makeRequest(`/partners?${getUrlString(query)}`, "put", data).then(
        (json) => {
          if (json) {
            this.partners = json.data;
          }
          callback(Boolean(json));
        }
      );
    },
    deletePartner(query = {}) {
      makeRequest(`/partners?${getUrlString(query)}`, "delete").then((json) => {
        if (json) {
          this.partners = json.data;
        }
      });
    },
    getServicesList(query = {}, callback = () => {}) {
      makeRequest(`/services?${getUrlString(query)}`, "get").then((json) => {
        if (json) {
          if (query.id) {
            this.service[query.id] = json;
          } else {
            this.services = json;
          }
        }
        callback(Boolean(json));
      });
    },
    setSetvice(data, callback = () => {}) {
      makeRequest("/services", "post", data).then((json) => {
        if (json) {
          this.services = json;
        }
        callback(Boolean(json));
      });
    },
    updateService(query = {}, data, callback = () => {}) {
      makeRequest(`/services?${getUrlString(query)}`, "put", data).then(
        (json) => {
          if (json) {
            this.services = json.data;
          }
          callback(Boolean(json));
        }
      );
    },
    deleteService(query = {}) {
      makeRequest(`/services?${getUrlString(query)}`, "delete").then((json) => {
        if (json) {
          this.services = json.data;
        }
      });
    },
    sendFeedback(data, callback) {
      makeRequest("/mail/feedback", "post", data).then((json) => {
        this.alert = json
          ? { severity: "success", message: "Успешно отправлена" }
          : { severity: "error", message: "Произошла не предвиденная ошибка" };
        callback(Boolean(json));
      });
    },
    editorUpload(data) {
      return makeRequest("/editor-uploads", "post", data);
    },
  },
});

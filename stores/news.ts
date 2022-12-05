import { getNewsFeed, getNewsInfo } from "@/api";
import {
  isNewsFeed,
  isNewsInfo,
} from "@/api/index.guards";
import {
  INews,
  IRequestFailed,
  TNewsFeed,
} from "@/api/index.types";
import { defineStore } from "pinia";
import { INewsState } from "./news.types";

export const useNewsStore = defineStore(
  "app.news",
  {
    state(): INewsState {
      return {
        // list
        newsFeed: [],
        // news info
        newsInfo: null,
      };
    },
    getters: {
      // list
      getNewsFeed(): TNewsFeed {
        return this.newsFeed;
      },
      // news info
      getCurrentNews(): INews {
        return this.newsInfo;
      },
    },
    actions: {
      // LIST
      fetchNewsFeed() {
        return new Promise<
          TNewsFeed | IRequestFailed
        >((resolve, reject) =>
          getNewsFeed()
            .then((data) => {
              if (isNewsFeed(data)) {
                this.newsFeed = data;
                resolve(data);
              }
            })
            .catch((err) => reject(err))
        );
      },
      // NEWS INFO
      fetchNewsInfo(id: string) {
        return new Promise<
          [INews] | IRequestFailed
        >((resolve, reject) =>
          getNewsInfo({ id })
            .then((data) => {
              if (isNewsInfo(data)) {
                this.newsInfo = data[0];
                resolve(data);
              }
            })
            .catch((err) => reject(err))
        );
      },
    },
  }
);

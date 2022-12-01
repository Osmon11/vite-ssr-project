import { getSlideList } from "@/api";
import { isSlideList } from "@/api/index.guards";
import {
  IRequestFailed,
  TSlideList,
} from "@/api/index.types";
import { defineStore } from "pinia";
import { ISliderState } from "./slider.types";

export const useSliderStore = defineStore(
  "app.slider",
  {
    state(): ISliderState {
      return {
        // list
        slides: [],
      };
    },
    getters: {
      // list
      getSlides(): TSlideList {
        return this.slides;
      },
    },
    actions: {
      fetchSlides() {
        return new Promise<
          TSlideList | IRequestFailed
        >((resolve, reject) =>
          getSlideList()
            .then((data) => {
              if (isSlideList(data)) {
                this.slides = data;
                resolve(data);
              }
            })
            .catch((err) => reject(err))
        );
      },
    },
  }
);

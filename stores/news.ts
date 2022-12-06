import { defineStore } from "pinia";
import { useFormDataCreator } from "@/utils/useFormDataCreator";
import {
  createNews,
  deleteNews,
  editNews,
  getNewsFeed,
  getNewsInfo,
} from "@/api";
import {
  isNewsFeed,
  isNewsInfo,
} from "@/api/index.guards";
import {
  INews,
  IRequestFailed,
  TNewsFeed,
} from "@/api/index.types";
import {
  INewsForm,
  INewsState,
} from "./news.types";

const formDefaults: INewsForm = {
  _id: null,
  createdAt: null,
  content_en: "",
  content_ru: "",
  subtitle_en: null,
  subtitle_ru: null,
  title_en: null,
  title_ru: null,
  image: [],
  imageUrl: null,
  imageName: null,
};

export const useNewsStore = defineStore(
  "app.news",
  {
    state(): INewsState {
      return {
        // form
        form: JSON.parse(
          JSON.stringify(formDefaults)
        ),
        // list
        newsFeed: [],
        // news info
        newsInfo: null,
      };
    },
    getters: {
      // form
      getForm(): INewsForm {
        return this.form;
      },
      getFormData(): FormData {
        const formDataCreator =
          useFormDataCreator();
        return formDataCreator({
          ...this.form,
          image: this.form.image[0],
        });
      },
      isEditMod(): boolean {
        return typeof this.form._id === "string";
      },
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
      // UPDATE
      updateForm(key: string, value: any) {
        this.form[key] = value;
      },
      // SET
      setForm(news: INews) {
        this.form = news;
      },
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
      // SAVE
      save() {
        return this.isEditMod
          ? this.edit()
          : this.create();
      },
      // CREATE
      create() {
        return new Promise<
          TNewsFeed | IRequestFailed
        >((resolve, reject) =>
          createNews(this.getFormData)
            .then((data) => {
              if (isNewsFeed(data)) {
                this.newsFeed = data;
                resolve(data);
              }
            })
            .catch((err) => reject(err))
        );
      },
      // EDIT
      edit() {
        return new Promise<
          TNewsFeed | IRequestFailed
        >((resolve, reject) =>
          editNews(
            { id: this.form._id },
            this.getFormData
          )
            .then((data) => {
              if (isNewsFeed(data)) {
                this.newsFeed = data;
                resolve(data);
              }
            })
            .catch((err) => reject(err))
        );
      },
      // DELETE
      delete(id: string) {
        return new Promise<
          TNewsFeed | IRequestFailed
        >((resolve, reject) =>
          deleteNews({ id })
            .then((data) => {
              if (isNewsFeed(data)) {
                this.newsFeed = data;
                resolve(data);
              }
            })
            .catch((err) => reject(err))
        );
      },
      // RESET
      resetForm() {
        this.form = JSON.parse(
          JSON.stringify(formDefaults)
        );
      },
    },
  }
);

import { defineStore } from "pinia";
import { useFormDataCreator } from "@/utils/useFormDataCreator";
import {
  createSlide,
  deleteSlide,
  editSlide,
  getSlideList,
} from "@/api";
import { isSlideList } from "@/api/index.guards";
import {
  IRequestFailed,
  ISlide,
  TSlideList,
} from "@/api/index.types";
import {
  ISlideForm,
  ISlideState,
} from "./slide.types";

const formDefaults: ISlideForm = {
  createdAt: null,
  imageName: null,
  imageUrl: null,
  subtitle_en: null,
  subtitle_ru: null,
  title_en: null,
  title_ru: null,
  _id: null,
};

export const useSlideStore = defineStore(
  "app.slide",
  {
    state(): ISlideState {
      return {
        // form
        form: JSON.parse(
          JSON.stringify(formDefaults)
        ),
        // list
        slides: [],
      };
    },
    getters: {
      // form
      getForm(): ISlideForm {
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
      getSlides(): TSlideList {
        return this.slides;
      },
    },
    actions: {
      // UPDATE
      updateForm(key: string, value: any) {
        this.form[key] = value;
      },
      // SET
      setForm(slide: ISlide) {
        this.form = slide;
      },
      // LIST
      fetchSlideList() {
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
      // SAVE
      save() {
        return this.isEditMod
          ? this.edit()
          : this.create();
      },
      // CREATE
      create() {
        return new Promise<
          TSlideList | IRequestFailed
        >((resolve, reject) =>
          createSlide(this.getFormData)
            .then((data) => {
              if (isSlideList(data)) {
                this.slides = data;
                resolve(data);
              }
            })
            .catch((err) => reject(err))
        );
      },
      // EDIT
      edit() {
        return new Promise<
          TSlideList | IRequestFailed
        >((resolve, reject) =>
          editSlide(
            { id: this.form._id },
            this.getFormData
          )
            .then((data) => {
              if (isSlideList(data)) {
                this.slides = data;
                resolve(data);
              }
            })
            .catch((err) => reject(err))
        );
      },
      // DELETE
      delete(id: string) {
        return new Promise<
          TSlideList | IRequestFailed
        >((resolve, reject) =>
          deleteSlide({ id })
            .then((data) => {
              if (isSlideList(data)) {
                this.slides = data;
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

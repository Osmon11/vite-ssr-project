import { defineStore } from "pinia";
import { useFormDataCreator } from "@/utils/useFormDataCreator";
import {
  createService,
  deleteService,
  editService,
  getServiceList,
} from "@/api";
import { isServiceList } from "@/api/index.guards";
import {
  IRequestFailed,
  IService,
  TServiceList,
} from "@/api/index.types";
import {
  IServiceForm,
  IServiceState,
} from "./service.types";

const formDefaults: IServiceForm = {
  content_en: "",
  content_ru: "",
  name_en: null,
  name_ru: null,
  _id: null,
};

export const useServiceStore = defineStore(
  "app.service",
  {
    state(): IServiceState {
      return {
        // form
        form: JSON.parse(
          JSON.stringify(formDefaults)
        ),
        // list
        services: [],
      };
    },
    getters: {
      // form
      getForm(): IServiceForm {
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
      getServiceList(): TServiceList {
        return this.services;
      },
    },
    actions: {
      // UPDATE
      updateForm(key: string, value: any) {
        this.form[key] = value;
      },
      // SET
      setForm(partner: IService) {
        this.form = partner;
      },
      // LIST
      fetchServiceList() {
        return new Promise<
          TServiceList | IRequestFailed
        >((resolve, reject) =>
          getServiceList()
            .then((data) => {
              if (isServiceList(data)) {
                this.services = data;
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
          TServiceList | IRequestFailed
        >((resolve, reject) =>
          createService(this.getFormData)
            .then((data) => {
              if (isServiceList(data)) {
                this.services = data;
                resolve(data);
              }
            })
            .catch((err) => reject(err))
        );
      },
      // EDIT
      edit() {
        return new Promise<
          TServiceList | IRequestFailed
        >((resolve, reject) =>
          editService(
            { id: this.form._id },
            this.getFormData
          )
            .then((data) => {
              if (isServiceList(data)) {
                this.services = data;
                resolve(data);
              }
            })
            .catch((err) => reject(err))
        );
      },
      // DELETE
      delete(id: string) {
        return new Promise<
          TServiceList | IRequestFailed
        >((resolve, reject) =>
          deleteService({ id })
            .then((data) => {
              if (isServiceList(data)) {
                this.services = data;
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

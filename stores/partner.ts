import { defineStore } from "pinia";
import { useFormDataCreator } from "@/utils/useFormDataCreator";
import {
  createPartner,
  deletePartner,
  editPartner,
  getPartnerList,
} from "@/api";
import { isPartnerList } from "@/api/index.guards";
import {
  IPartner,
  IRequestFailed,
  TPartnerList,
} from "@/api/index.types";
import {
  IPartnerForm,
  IPartnerState,
} from "./partner.types";

const formDefaults: IPartnerForm = {
  name_en: null,
  name_ru: null,
  _id: null,
  image: [],
  logo: null,
};

export const usePartnerStore = defineStore(
  "app.partner",
  {
    state(): IPartnerState {
      return {
        // form
        form: JSON.parse(
          JSON.stringify(formDefaults)
        ),
        // list
        partners: [],
      };
    },
    getters: {
      // form
      getForm(): IPartnerForm {
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
      getPartners(): TPartnerList {
        return this.partners;
      },
    },
    actions: {
      // UPDATE
      updateForm(key: string, value: any) {
        this.form[key] = value;
      },
      // SET
      setForm(partner: IPartner) {
        this.form = { ...partner, image: [] };
      },
      // LIST
      fetchPartnerList() {
        return new Promise<
          TPartnerList | IRequestFailed
        >((resolve, reject) =>
          getPartnerList()
            .then((data) => {
              if (isPartnerList(data)) {
                this.partners = data;
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
          TPartnerList | IRequestFailed
        >((resolve, reject) =>
          createPartner(this.getFormData)
            .then((data) => {
              if (isPartnerList(data)) {
                this.partners = data;
                resolve(data);
              }
            })
            .catch((err) => reject(err))
        );
      },
      // EDIT
      edit() {
        return new Promise<
          TPartnerList | IRequestFailed
        >((resolve, reject) =>
          editPartner(
            { id: this.form._id },
            this.getFormData
          )
            .then((data) => {
              if (isPartnerList(data)) {
                this.partners = data;
                resolve(data);
              }
            })
            .catch((err) => reject(err))
        );
      },
      // DELETE
      delete(id: string) {
        return new Promise<
          TPartnerList | IRequestFailed
        >((resolve, reject) =>
          deletePartner({ id })
            .then((data) => {
              if (isPartnerList(data)) {
                this.partners = data;
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

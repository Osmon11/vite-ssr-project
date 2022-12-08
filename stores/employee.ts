import { defineStore } from "pinia";
import { isEmployeeList } from "@/api/index.guards";
import { useFormDataCreator } from "@/utils/useFormDataCreator";
import {
  IEmployee,
  IRequestFailed,
  TEmployeeList,
} from "@/api/index.types";
import {
  IEmployeeForm,
  IEmployeeState,
} from "./employee.types";
import {
  createEmployee,
  deleteEmployee,
  editEmployee,
  getEmployeeList,
} from "@/api";

const formDefaults: IEmployeeForm = {
  biography_en: null,
  biography_ru: null,
  fullname_en: null,
  fullname_ru: null,
  _id: null,
  image: [],
  avatar: null,
};

export const useEmployeeStore = defineStore(
  "app.employee",
  {
    state(): IEmployeeState {
      return {
        // form
        form: JSON.parse(
          JSON.stringify(formDefaults)
        ),
        // list
        employees: [],
      };
    },
    getters: {
      // form
      getForm(): IEmployeeForm {
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
      getEmployees(): TEmployeeList {
        return this.employees;
      },
    },
    actions: {
      // UPDATE
      updateForm(key: string, value: any) {
        this.form[key] = value;
      },
      // SET
      setForm(employee: IEmployee) {
        this.form = { ...employee, image: [] };
      },
      // LIST
      fetchEmployeeList() {
        return new Promise<
          TEmployeeList | IRequestFailed
        >((resolve, reject) =>
          getEmployeeList()
            .then((data) => {
              if (isEmployeeList(data)) {
                this.employees = data;
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
          TEmployeeList | IRequestFailed
        >((resolve, reject) =>
          createEmployee(this.getFormData)
            .then((data) => {
              if (isEmployeeList(data)) {
                this.employees = data;
                resolve(data);
              }
            })
            .catch((err) => reject(err))
        );
      },
      // EDIT
      edit() {
        return new Promise<
          TEmployeeList | IRequestFailed
        >((resolve, reject) =>
          editEmployee(
            { id: this.form._id },
            this.getFormData
          )
            .then((data) => {
              if (isEmployeeList(data)) {
                this.employees = data;
                resolve(data);
              }
            })
            .catch((err) => reject(err))
        );
      },
      // DELETE
      delete(id: string) {
        return new Promise<
          TEmployeeList | IRequestFailed
        >((resolve, reject) =>
          deleteEmployee({ id })
            .then((data) => {
              if (isEmployeeList(data)) {
                this.employees = data;
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

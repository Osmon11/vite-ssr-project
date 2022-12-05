import { getEmployeeList } from "@/api";
import { isEmployeeList } from "@/api/index.guards";
import {
  IRequestFailed,
  TEmployeeList,
} from "@/api/index.types";
import { defineStore } from "pinia";
import { IEmployeeState } from "./employee.types";

export const useEmployeeStore = defineStore(
  "app.employee",
  {
    state(): IEmployeeState {
      return {
        // list
        employees: [],
      };
    },
    getters: {
      // list
      getEmployees(): TEmployeeList {
        return this.employees;
      },
    },
    actions: {
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
    },
  }
);

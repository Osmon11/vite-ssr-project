import { getServiceList } from "@/api";
import { isServiceList } from "@/api/index.guards";
import {
  IRequestFailed,
  TServiceList,
} from "@/api/index.types";
import { defineStore } from "pinia";
import { IServiceState } from "./service.types";

export const useServiceStore = defineStore(
  "app.service",
  {
    state(): IServiceState {
      return {
        // list
        services: [],
      };
    },
    getters: {
      // list
      getServiceList(): TServiceList {
        return this.services;
      },
    },
    actions: {
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
    },
  }
);

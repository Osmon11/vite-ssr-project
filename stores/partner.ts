import { getPartnerList } from "@/api";
import { isPartnerList } from "@/api/index.guards";
import {
  IRequestFailed,
  TPartnerList,
} from "@/api/index.types";
import { defineStore } from "pinia";
import { IPartnerState } from "./partner.types";

export const usePartnerStore = defineStore(
  "app.partner",
  {
    state(): IPartnerState {
      return {
        // list
        partners: [],
      };
    },
    getters: {
      // list
      getPartners(): TPartnerList {
        return this.partners;
      },
    },
    actions: {
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
    },
  }
);

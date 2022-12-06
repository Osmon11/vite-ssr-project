import {
  IPartner,
  TPartnerList,
} from "@/api/index.types";
import { IIndexable } from "@/types/interfaces";

export interface IPartnerState {
  // form
  form: IPartnerForm;
  // list
  partners: TPartnerList;
}

export interface IPartnerForm
  extends IIndexable,
    IPartner {
  image?: File[];
}

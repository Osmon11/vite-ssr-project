import {
  IService,
  TServiceList,
} from "@/api/index.types";
import { IIndexable } from "@/types/interfaces";

export interface IServiceState {
  // form
  form: IServiceForm;
  // list
  services: TServiceList;
}

export interface IServiceForm
  extends IIndexable,
    IService {}

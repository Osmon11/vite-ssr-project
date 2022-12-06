import {
  ISlide,
  TSlideList,
} from "@/api/index.types";
import { IIndexable } from "@/types/interfaces";

export interface ISlideState {
  // form
  form: ISlideForm;
  // list
  slides: TSlideList;
}

export interface ISlideForm
  extends IIndexable,
    ISlide {
  image?: File[];
}

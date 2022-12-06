import {
  INews,
  TNewsFeed,
} from "@/api/index.types";
import { IIndexable } from "@/types/interfaces";

export interface INewsState {
  // form
  form: INewsForm;
  // list
  newsFeed: TNewsFeed;
  // news info
  newsInfo: INews;
}

export interface INewsForm
  extends IIndexable,
    INews {
  image?: File[];
}

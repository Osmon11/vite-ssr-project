import {
  INews,
  TNewsFeed,
} from "@/api/index.types";

export interface INewsState {
  // list
  newsFeed: TNewsFeed;
  // news info
  newsInfo: INews;
}

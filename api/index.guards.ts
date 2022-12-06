import {
  IUserInfo,
  IRequestFailed,
  TSlideList,
  TNewsFeed,
  TEmployeeList,
  TPartnerList,
  TServiceList,
  INews,
} from "./index.types";

// --> GENERAL
export const isFile = (
  data: Object
): data is File =>
  data &&
  "size" in data &&
  "type" in data &&
  "name" in data &&
  "lastModified" in data;
// --> USER
export const isUserInfoData = (
  data: IUserInfo | IRequestFailed
): data is IUserInfo => data && "token" in data;
// --> SLIDES
export const isSlideList = (
  data: TSlideList | IRequestFailed
): data is TSlideList => Array.isArray(data);
// --> NEWS FEED
export const isNewsFeed = (
  data: TNewsFeed | IRequestFailed
): data is TNewsFeed => Array.isArray(data);
export const isNewsInfo = (
  data: [INews] | IRequestFailed
): data is [INews] =>
  Array.isArray(data) &&
  data[0] &&
  "_id" in data[0];
// --> EMPLOYEE
export const isEmployeeList = (
  data: TEmployeeList | IRequestFailed
): data is TEmployeeList => Array.isArray(data);
// --> PARTNER
export const isPartnerList = (
  data: TPartnerList | IRequestFailed
): data is TPartnerList => Array.isArray(data);
// --> SERVICE
export const isServiceList = (
  data: TServiceList | IRequestFailed
): data is TServiceList => Array.isArray(data);
// --> FEEDBACK
export const isFeedbackCreateData = (
  data: TPartnerList | IRequestFailed
): data is TPartnerList => Array.isArray(data);

import {
  IUserInfo,
  IRequestFailed,
  TSlideList,
  TNewsFeed,
  TEmployeeList,
  TPartnerList,
  TServiceList,
} from "./index.types";

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

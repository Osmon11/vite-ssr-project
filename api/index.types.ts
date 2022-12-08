// --> GENERAL
export interface IRequestFailed {
  message: string;
}
export interface IQueryId {
  id: string;
}
// --> AUTHORIZATION
export interface IAuthPayload {
  login: string;
  password: string;
}
// --> USER
export interface IUserInfo {
  _id: string;
  token: string;
  login: string;
}
// --> SLIDES
export interface ISlide {
  createdAt: string;
  imageName: string;
  imageUrl: string;
  subtitle_en: string;
  subtitle_ru: string;
  title_en: string;
  title_ru: string;
  _id: string;
}
export type TSlideList = ISlide[];
// --> NEWS FEED
export interface INews {
  content_en: string;
  content_ru: string;
  createdAt: string;
  imageName: string;
  imageUrl: string;
  subtitle_en: string;
  subtitle_ru: string;
  title_en: string;
  title_ru: string;
  _id: string;
}
export type TNewsFeed = INews[];
// --> EMPLOYEE
export interface IEmployee {
  avatar: string;
  biography_en: string;
  biography_ru: string;
  fullname_en: string;
  fullname_ru: string;
  _id: string;
}
export type TEmployeeList = IEmployee[];
// --> PARTNER
export interface IPartner {
  logo: string;
  name_en: string;
  name_ru: string;
  _id: string;
}
export type TPartnerList = IPartner[];
// --> SERVICE
export interface IService {
  content_en: string;
  content_ru: string;
  name_en: string;
  name_ru: string;
  _id: string;
}
export type TServiceList = IService[];
// --> FEEDBACK
export interface IFeedbackPayload {
  message: string;
}
export interface IFeedbackCreateData {
  info: {
    accepted: string[];
    rejected: string[];
    envelopeTime: number;
    messageTime: number;
    messageSize: number;
    response: string;
    envelope: {
      from: string;
      to: string[];
    };
    messageId: string;
  };
  preview: boolean;
}

import axios from "axios";
import {
  IQueryId,
  IAuthPayload,
  IUserInfo,
  IRequestFailed,
  TEmployeeList,
  TNewsFeed,
  TPartnerList,
  TServiceList,
  TSlideList,
  IFeedbackCreateData,
  IFeedbackPayload,
} from "./index.types";

// --> Authorization
// login
export const login = (payload: IAuthPayload) =>
  new Promise<IUserInfo | IRequestFailed>(
    (resolve, reject) =>
      axios
        .post("/auth/login", payload)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  );
// --> USER
// get user info
export const getUserInfo = () =>
  new Promise<IUserInfo | IRequestFailed>(
    (resolve, reject) =>
      axios
        .get("/user/info")
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  );
// --> SLIDES
// get slide list
export const getSlideList = (query?: IQueryId) =>
  new Promise<TSlideList | IRequestFailed>(
    (resolve, reject) =>
      axios
        .get("/slides", {
          params: query,
          paramsSerializer: {
            indexes: null,
          },
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  );
// create slide
export const createSlide = (payload: FormData) =>
  new Promise<TSlideList | IRequestFailed>(
    (resolve, reject) =>
      axios
        .post("/slides", payload)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  );
// edit slide
export const editSlide = (
  query: IQueryId,
  payload: FormData
) =>
  new Promise<TSlideList | IRequestFailed>(
    (resolve, reject) =>
      axios
        .put("/slides", payload, {
          params: query,
          paramsSerializer: {
            indexes: null,
          },
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  );
// delete slide
export const deleteSlide = (query: IQueryId) =>
  new Promise<TSlideList | IRequestFailed>(
    (resolve, reject) =>
      axios
        .delete("/slides", {
          params: query,
          paramsSerializer: {
            indexes: null,
          },
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  );
// --> NEWS FEED
// get newsfeed
export const getNewsFeed = (query: IQueryId) =>
  new Promise<TNewsFeed | IRequestFailed>(
    (resolve, reject) =>
      axios
        .get("/news-feed", {
          params: query,
          paramsSerializer: {
            indexes: null,
          },
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  );
// create news
export const createNews = (payload: FormData) =>
  new Promise<TNewsFeed | IRequestFailed>(
    (resolve, reject) =>
      axios
        .post("/news-feed", payload)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  );
// edit news
export const editNews = (
  query: IQueryId,
  payload: FormData
) =>
  new Promise<TNewsFeed | IRequestFailed>(
    (resolve, reject) =>
      axios
        .put("/news-feed", payload, {
          params: query,
          paramsSerializer: {
            indexes: null,
          },
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  );
// delete news
export const deleteNews = (query: IQueryId) =>
  new Promise<TNewsFeed | IRequestFailed>(
    (resolve, reject) =>
      axios
        .delete("/news-feed", {
          params: query,
          paramsSerializer: {
            indexes: null,
          },
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  );
// --> EMPLOYEE
// get employee list
export const getEmployeeList = (
  query?: IQueryId
) =>
  new Promise<TEmployeeList | IRequestFailed>(
    (resolve, reject) =>
      axios
        .get("/shariah-board", {
          params: query,
          paramsSerializer: {
            indexes: null,
          },
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  );
// create employee
export const createEmployee = (
  payload: FormData
) =>
  new Promise<TEmployeeList | IRequestFailed>(
    (resolve, reject) =>
      axios
        .post("/shariah-board", payload)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  );
// edit employee
export const editEmployee = (
  query: IQueryId,
  payload: FormData
) =>
  new Promise<TEmployeeList | IRequestFailed>(
    (resolve, reject) =>
      axios
        .put("/shariah-board", payload, {
          params: query,
          paramsSerializer: {
            indexes: null,
          },
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  );
// delete employee
export const deleteEmployee = (query: IQueryId) =>
  new Promise<TEmployeeList | IRequestFailed>(
    (resolve, reject) =>
      axios
        .delete("/shariah-board", {
          params: query,
          paramsSerializer: {
            indexes: null,
          },
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  );
// --> PARTNER
// get partner list
export const getPartnerList = (
  query?: IQueryId
) =>
  new Promise<TPartnerList | IRequestFailed>(
    (resolve, reject) =>
      axios
        .get("/partners", {
          params: query,
          paramsSerializer: {
            indexes: null,
          },
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  );
// create partner
export const createPartner = (
  payload: FormData
) =>
  new Promise<TPartnerList | IRequestFailed>(
    (resolve, reject) =>
      axios
        .post("/partners", payload)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  );
// edit partner
export const editPartner = (
  query: IQueryId,
  payload: FormData
) =>
  new Promise<TPartnerList | IRequestFailed>(
    (resolve, reject) =>
      axios
        .put("/partners", payload, {
          params: query,
          paramsSerializer: {
            indexes: null,
          },
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  );
// delete partner
export const deletePartner = (query: IQueryId) =>
  new Promise<TPartnerList | IRequestFailed>(
    (resolve, reject) =>
      axios
        .delete("/partners", {
          params: query,
          paramsSerializer: {
            indexes: null,
          },
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  );
// --> SERVICE
// get service list
export const getServiceList = (
  query?: IQueryId
) =>
  new Promise<TServiceList | IRequestFailed>(
    (resolve, reject) =>
      axios
        .get("/services", {
          params: query,
          paramsSerializer: {
            indexes: null,
          },
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  );
// create service
export const createService = (
  payload: FormData
) =>
  new Promise<TServiceList | IRequestFailed>(
    (resolve, reject) =>
      axios
        .post("/services", payload)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  );
// edit service
export const editService = (
  query: IQueryId,
  payload: FormData
) =>
  new Promise<TServiceList | IRequestFailed>(
    (resolve, reject) =>
      axios
        .put("/services", payload, {
          params: query,
          paramsSerializer: {
            indexes: null,
          },
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  );
// delete service
export const deleteService = (query: IQueryId) =>
  new Promise<TServiceList | IRequestFailed>(
    (resolve, reject) =>
      axios
        .delete("/services", {
          params: query,
          paramsSerializer: {
            indexes: null,
          },
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
  );
// --> FEEDBACK
// create feedback
export const createFeedback = (
  payload: IFeedbackPayload
) =>
  new Promise<
    IFeedbackCreateData | IRequestFailed
  >((resolve, reject) =>
    axios
      .post("/mail/feedback", payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  );
// --> EDITOR
// ckeditor uploads
export const editorUploads = (payload: any) =>
  new Promise((resolve, reject) =>
    axios
      .post("/editor-uploads", payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  );

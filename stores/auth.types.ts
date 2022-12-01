import { IIndexable } from "@/types/interfaces";
import {
  IAuthPayload,
  IUserInfo,
} from "@/api/index.types";

export interface IAuthState {
  // user info
  user: IUserInfo;
  // form
  loginForm: ILoginForm;
}

export interface ILoginForm
  extends IIndexable,
    IAuthPayload {}

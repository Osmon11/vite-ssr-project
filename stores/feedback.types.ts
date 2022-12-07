import { IIndexable } from "@/types/interfaces";

export interface IFeedbackState {
  // form
  form: IFeedbackForm;
}

export interface IFeedbackForm
  extends IIndexable {
  userName: string;
  email: string;
  message: string;
}

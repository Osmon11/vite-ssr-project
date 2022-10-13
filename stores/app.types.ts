import { IIndexable } from "@/types/interfaces";

export interface IAppStoreState {
  token: string;
  languages: ILanguages;
}

export interface ILanguages {
  primary: string;
  secondary: string;
}

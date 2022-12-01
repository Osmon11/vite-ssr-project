import { IIndexable } from "@/types/interfaces";

export interface IAppStoreState {
  languages: ILanguages;
}

export interface ILanguages {
  primary: string;
  secondary: string;
}

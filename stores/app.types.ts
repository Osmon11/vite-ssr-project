export interface IAppStoreState {
  languages: ILanguages;
  alert: IAlert;
  promp: IPromp;
}

export interface ILanguages {
  primary: string;
  secondary: string;
}
export interface IAlert {
  type: "success" | "info" | "warning" | "error";
  message: string;
}
export interface IPromp {
  confirm?: () => void;
  reject?: () => void;
  message: string;
}

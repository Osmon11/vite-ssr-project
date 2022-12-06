import { IIndexable } from "@/types/interfaces";

export const useFormDataCreator =
  () => (form: IIndexable) => {
    const formData = new FormData();

    for (let key in form) {
      formData.append(key, form[key]);
    }

    return formData;
  };

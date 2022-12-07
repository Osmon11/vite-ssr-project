import { createFeedback } from "@/api";
import { isFeedbackCreateData } from "@/api/index.guards";
import {
  IFeedbackCreateData,
  IRequestFailed,
} from "@/api/index.types";
import { useNotification } from "@/utils/useNotification";
import { defineStore } from "pinia";
import {
  IFeedbackForm,
  IFeedbackState,
} from "./feedback.types";

const formDefaults: IFeedbackForm = {
  userName: null,
  email: null,
  message: null,
};

export const useFeedbackStore = defineStore(
  "app.feedback",
  {
    state(): IFeedbackState {
      return {
        // form
        form: JSON.parse(
          JSON.stringify(formDefaults)
        ),
      };
    },
    getters: {
      // form
      getForm(): IFeedbackForm {
        return this.form;
      },
    },
    actions: {
      // UPDATE
      updateForm(key: string, value: any) {
        this.form[key] = value;
      },
      // SAVE
      save() {
        const formData = {
          message: `
        Имя: ${this.form.userName}\n
        Почта: ${this.form.email}\n
        Сообщение: ${this.form.message}
      `,
        };
        return new Promise<
          IFeedbackCreateData | IRequestFailed
        >((resolve, reject) =>
          createFeedback(formData)
            .then((data) => {
              const { setAlert } =
                useNotification();
              if (isFeedbackCreateData(data)) {
                setAlert({
                  type: "success",
                  message:
                    "lang-dc1b5d68-cbea-4f38-8e1d-6b7c1907dedc",
                });
                resolve(data);
              } else {
                setAlert({
                  type: "error",
                  message:
                    "lang-6ade0c46-b7be-48f9-81dc-403176a06468",
                });
              }
            })
            .catch((err) => reject(err))
        );
      },
      // RESET
      resetForm() {
        this.form = JSON.parse(
          JSON.stringify(formDefaults)
        );
      },
    },
  }
);

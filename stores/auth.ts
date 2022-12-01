import { defineStore } from "pinia";
import {
  IAuthState,
  ILoginForm,
} from "./auth.types";
import { login } from "@/api";
import { isUserInfoData } from "@/api/index.guards";
import {
  IRequestFailed,
  IUserInfo,
} from "@/api/index.types";

const loginFormDefaults: ILoginForm = {
  login: null,
  password: null,
};

export const useAuthStore = defineStore(
  "app.auth",
  {
    state(): IAuthState {
      return {
        // user info
        user: {
          _id: null,
          token: null,
          login: null,
        },
        // form
        loginForm: JSON.parse(
          JSON.stringify(loginFormDefaults)
        ),
      };
    },
    getters: {
      isAdmin(): boolean {
        return Boolean(this.user.token);
      },
      // user info
      getUserInfo(): IUserInfo {
        return this.user;
      },
      // form
      getLoginForm(): ILoginForm {
        return this.loginForm;
      },
    },
    actions: {
      // update
      updateLoginForm(key: string, value: any) {
        this.loginForm[key] = value;
      },
      // auth
      login() {
        return new Promise<
          IUserInfo | IRequestFailed
        >((resolve, reject) =>
          login(this.loginForm)
            .then((data) => {
              if (isUserInfoData(data)) {
                this.user = data;
                resolve(data);
              }
            })
            .catch((err) => reject(err))
        );
      },
      // reset
      resetLoginForm() {
        this.loginForm = JSON.parse(
          JSON.stringify(loginFormDefaults)
        );
      },
    },
  }
);

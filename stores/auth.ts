import { navigate } from "vite-plugin-ssr/client/router";
import { defineStore } from "pinia";
import cookie_js from "cookie_js";
import moment from "moment";

import {
  IAuthState,
  ILoginForm,
} from "./auth.types";
import {
  IRequestFailed,
  IUserInfo,
} from "@/api/index.types";
import { login } from "@/api";
import { isUserInfoData } from "@/api/index.guards";

const userDefaults: IUserInfo = {
  _id: null,
  token: null,
  login: null,
};
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
        user: JSON.parse(
          JSON.stringify(userDefaults)
        ),
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
                cookie_js.set(
                  import.meta.env.VITE_TOKEN_KEY,
                  data.token,
                  {
                    expires: new Date(
                      moment()
                        .add(1, "day")
                        .toLocaleString()
                    ).toUTCString(),
                    path: "/",
                  }
                );
                resolve(data);
              }
            })
            .catch((err) => reject(err))
        );
      },
      logout() {
        cookie_js.removeSpecific(
          import.meta.env.VITE_TOKEN_KEY,
          { path: "/" }
        );
        this.resetUser();
        navigate("/login");
      },
      // reset
      resetUser() {
        this.user = JSON.parse(
          JSON.stringify(userDefaults)
        );
      },
      resetLoginForm() {
        this.loginForm = JSON.parse(
          JSON.stringify(loginFormDefaults)
        );
      },
    },
  }
);

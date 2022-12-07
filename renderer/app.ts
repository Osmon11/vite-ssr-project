import axios from "axios";
import {
  h,
  reactive,
  createSSRApp,
  defineComponent,
  createApp as createSPAApp,
} from "vue";
import cookie_js from "cookie_js";

import type {
  Component,
  PageContext,
} from "./types";
import { setPageContext } from "./usePageContext";
import { useAuthStore } from "@/stores/auth";
import vuetify from "@/plugins/vuetify";
import i18n from "@/plugins/i18n";
import { useNotification } from "@/utils/useNotification";

export { createApp };

function createApp(
  pageContext: PageContext,
  clientOnly: boolean
) {
  const { Page, pageProps } = pageContext;

  let rootComponent: Component;
  const PageWithWrapper = defineComponent({
    created() {
      rootComponent = this;
    },
    render() {
      return h(Page, pageProps || {});
    },
  });

  axios.defaults.baseURL =
    import.meta.env.VITE_API_URL;

  axios.interceptors.request.use(
    function (config) {
      const token = cookie_js.get(
        import.meta.env.VITE_TOKEN_KEY
      );
      if (token) {
        config.headers.authorization = token
          ? `Bearer ${token}`
          : "";
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const authStore = useAuthStore();
      const { setAlert } = useNotification();
      switch (error.response.status) {
        case 401:
          setAlert({
            type: "error",
            message:
              error.response.data?.message ||
              "lang-6642980e-c5ab-4f92-bbee-e1070c6c2a5b",
          });
          authStore.logout();
          break;
        default: {
          setAlert({
            type: "error",
            message:
              error.response.data?.message ||
              "lang-88327f5c-ff19-42f8-94d8-0554bbdedeab",
          });
        }
      }
      return Promise.reject(error);
    }
  );

  const app = clientOnly
    ? createSPAApp(PageWithWrapper)
    : createSSRApp(PageWithWrapper);

  app.use(i18n);
  app.use(vuetify);

  // We use `app.changePage()` to do Client Routing, see `_default.page.client.js`
  objectAssign(app, {
    changePage: (pageContext: PageContext) => {
      Object.assign(
        pageContextReactive,
        pageContext
      );
      rootComponent.Page = pageContext.Page;
      rootComponent.pageProps =
        pageContext.pageProps || {};
    },
  });

  // When doing Client Routing, we mutate pageContext (see usage of `app.changePage()` in `_default.page.client.js`).
  // We therefore use a reactive pageContext.
  const pageContextReactive =
    reactive(pageContext);

  // Make `pageContext` accessible from any Vue component
  setPageContext(app, pageContextReactive);

  return app;
}

// Same as `Object.assign()` but with type inference
function objectAssign<Obj, ObjAddendum>(
  obj: Obj,
  objAddendum: ObjAddendum
): asserts obj is Obj & ObjAddendum {
  Object.assign(obj, objAddendum);
}

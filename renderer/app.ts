import {
  createSSRApp,
  defineComponent,
  h,
  reactive,
} from "vue";
import type {
  Component,
  PageContext,
} from "./types";
import { setPageContext } from "./usePageContext";
import vuetify from "@/plugins/vuetify";
import i18n from "@/plugins/i18n";
import axios from "axios";

export { createApp };

function createApp(pageContext: PageContext) {
  const { Page } = pageContext;

  let rootComponent: Component;
  const PageWithWrapper = defineComponent({
    created() {
      rootComponent = this;
    },
    render() {
      return h(Page, pageContext.pageProps || {});
    },
  });

  axios.defaults.baseURL =
    import.meta.env.VITE_API_URL;

  axios.interceptors.request.use(
    function (config) {
      // const authStore = useAuthStore();
      // if (authStore?.user) {
      //   const token = authStore.user.token;
      //   config.headers.authorization = token
      //     ? `Bearer ${token}`
      //     : "";
      // }

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
      // const authStore = useAuthStore();
      // switch (error.response.status) {
      //   case 401:
      //     authStore.logout();
      //     break;
      // }
      return Promise.reject(error);
    }
  );

  const app = createSSRApp(PageWithWrapper);

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

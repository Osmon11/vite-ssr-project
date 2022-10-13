import { createSSRApp, defineComponent, h, reactive } from "vue";
import type { Component, PageContext } from "./types";
import { setPageContext } from "./usePageContext";
import vuetify from "@/plugins/vuetify";
import i18n from "@/plugins/i18n";

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

  const app = createSSRApp(PageWithWrapper);

  app.use(i18n);
  app.use(vuetify);

  // We use `app.changePage()` to do Client Routing, see `_default.page.client.js`
  objectAssign(app, {
    changePage: (pageContext: PageContext) => {
      Object.assign(pageContextReactive, pageContext);
      rootComponent.Page = pageContext.Page;
      rootComponent.pageProps = pageContext.pageProps || {};
    },
  });

  // When doing Client Routing, we mutate pageContext (see usage of `app.changePage()` in `_default.page.client.js`).
  // We therefore use a reactive pageContext.
  const pageContextReactive = reactive(pageContext);

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

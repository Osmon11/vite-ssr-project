import { createSSRApp, defineComponent, h } from "vue";
import PageShell from "./PageShell.vue";
import { setPageContext } from "./usePageContext";
import type { PageContext } from "./types";
import vuetify from "../plugins/vuetify";
import { createPinia } from "pinia";

export { createApp };

function createApp(pageContext: PageContext) {
  const { Page, pageProps } = pageContext;
  const PageWithLayout = defineComponent({
    render() {
      return h(
        PageShell,
        {},
        {
          default() {
            return h(Page, pageProps || {});
          },
        }
      );
    },
  });

  const app = createSSRApp(PageWithLayout);
  const store = createPinia();

  app.use(store);
  app.use(vuetify);
  // Make `pageContext` available from any Vue component
  setPageContext(app, pageContext);

  return { app, store };
}

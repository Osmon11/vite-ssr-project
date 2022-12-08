// Hook `usePageContext()` to make `pageContext` available from any Vue component.
// See https://vite-plugin-ssr.com/pageContext-anywhere

import { inject } from "vue";
import type { App } from "vue";
import { PageContext } from "./types";
import { PageContextBuiltInClient } from "vite-plugin-ssr/client/router";

export { usePageContext };
export { setPageContext };

const key = Symbol();

function usePageContext(): PageContextBuiltInClient & PageContext {
  const pageContext: PageContextBuiltInClient & PageContext = inject(key);
  return pageContext;
}

function setPageContext(app: App, pageContext: PageContext) {
  app.provide(key, pageContext);
}

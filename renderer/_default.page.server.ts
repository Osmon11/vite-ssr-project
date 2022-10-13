import { renderToNodeStream } from "@vue/server-renderer";
import { escapeInject } from "vite-plugin-ssr";
import { createPinia } from "pinia";
import { createApp } from "./app";
import { getPageTitle } from "./getPageTitle";
import type { PageContext } from "./types";
import type { PageContextBuiltIn } from "vite-plugin-ssr";

export { onBeforeRender };
export { passToClient };
export { render };

const passToClient = ["initialStoreState", "pageProps", "documentProps"];

async function render(pageContext: PageContextBuiltIn & PageContext) {
  const app = createApp(pageContext);
  const stream = renderToNodeStream(app);

  const title = getPageTitle(pageContext);

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <div id="app">${stream}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      enableEagerStreaming: true,
    },
  };
}

async function onBeforeRender(pageContext: PageContextBuiltIn & PageContext) {
  const app = createApp(pageContext);

  const store = createPinia();
  app.use(store);

  const stream = renderToNodeStream(app);

  const initialStoreState = store.state.value;

  return {
    pageContext: {
      initialStoreState,
      stream,
    },
  };
}

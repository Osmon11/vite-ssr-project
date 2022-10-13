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

  const { documentProps } = pageContext.exports;
  const title = getPageTitle(pageContext);
  const description =
    (documentProps && documentProps.description) ||
    "App using Vite + vite-plugin-ssr";

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html>
      <head>
      <meta charset="UTF-8" />
         <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/document/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/document/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/document/favicon-16x16.png"
    />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
    <link rel="icon" href="/document/favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&amp;display=swap"
      rel="stylesheet"
    />
        <meta name="msapplication-TileColor" content="#da532c" />
     <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${description}" />
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

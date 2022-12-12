import { renderToNodeStream } from "@vue/server-renderer";
import { escapeInject } from "vite-plugin-ssr";
import { createPinia } from "pinia";
import { createApp } from "./app";
import { getPageTitle } from "./getPageTitle";
import type { PageContext } from "./types";
import type { PageContextBuiltIn } from "vite-plugin-ssr";
import "@/styles/index.css";
// fab -> floating action button - styles
import "@/styles/fab.css";

export { onBeforeRender };
export { passToClient };
export { render };

const passToClient = [
  "initialStoreState",
  "pageProps",
  "documentProps",
  "redirectTo",
];

async function render(
  pageContext: PageContextBuiltIn & PageContext
) {
  const { stream } = pageContext;

  const { documentProps } = pageContext.exports;
  const title = getPageTitle(pageContext);
  const description =
    (documentProps &&
      documentProps.description) ||
    import.meta.env.VITE_SITE_DESCRIPTION_EN;

  const documentHtml = escapeInject`<!DOCTYPE html>
  <html lang="en">
    <head>
    <meta charset="UTF-8" />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon-16x16.png"
    />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
    <link rel="icon" href="/favicon.ico" />
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
      <meta name="keywords" content="исламское финансирование, исламское финансирование в кыргызстане, исламские принципы финансирования, консультация по исламскому финансированию, шариатский наблюдательный совет, исламское финансирование для банков, Islamic finance, islamic finance in kyrgyzstan, islamic principles of financing, islamic financing consultation, sharia supervisory board, islamic finance for banks, Islamic Banking Windows, Исламское Банковское Окно, consulting services on Islamic Finance, Аманат Эдвайсори, Amanat Advisory, Islamic Financing implementation, внедрение Исламского финансирования" />
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

async function onBeforeRender(
  pageContext: PageContextBuiltIn & PageContext
) {
  const app = createApp(pageContext, false);

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

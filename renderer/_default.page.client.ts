import { createApp } from "./app";
import { createPinia } from "pinia";
import { getPageTitle } from "./getPageTitle";
import type { PageContext } from "./types";
import type { PageContextBuiltInClient } from "vite-plugin-ssr/client/router";
import "@/styles/index.css";
// fab -> floating action button - styles
import "@/styles/fab.css";

export const clientRouting = true;
export const prefetchStaticAssets = {
  when: "VIEWPORT",
};
export { render };
export { onHydrationEnd };
export { onPageTransitionStart };
export { onPageTransitionEnd };

async function render(
  pageContext: PageContextBuiltInClient &
    PageContext
) {
  let app: ReturnType<typeof createApp>;
  if (!app) {
    app = createApp(pageContext);

    const store = createPinia();
    app.use(store);
    store.state.value =
      pageContext.initialStoreState;

    app.mount("#app");
  } else {
    app.changePage(pageContext);
  }
  document.title = getPageTitle(pageContext);
}

function onHydrationEnd() {
  console.log(
    "Hydration finished; page is now interactive."
  );
}
function onPageTransitionStart() {
  console.log("Page transition start");
  document
    .querySelector(".content")!
    .classList.add("page-transition");
}
function onPageTransitionEnd() {
  console.log("Page transition end");
  document
    .querySelector(".content")!
    .classList.remove("page-transition");
}

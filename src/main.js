import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import localization from "./plugins/i18n";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

loadFonts();
const app = createApp(App);
const pinia = createPinia();

app.use(localization.i18n);
app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount("#app");

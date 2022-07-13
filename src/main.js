import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { i18n } from "./plugins/i18n";

loadFonts();
const app = createApp(App);
const pinia = createPinia();

app.use(i18n);
app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount("#app");

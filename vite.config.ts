import vue from "@vitejs/plugin-vue";
import ssr from "vite-plugin-ssr/plugin";
import { UserConfig } from "vite";

const config: UserConfig = {
  plugins: [vue(), ssr()],
  ssr: { noExternal: ["vuetify"] },
};

export default config;

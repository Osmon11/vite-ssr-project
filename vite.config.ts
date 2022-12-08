import vue from "@vitejs/plugin-vue";
import md from "vite-plugin-md";
import ssr from "vite-plugin-ssr/plugin";
import { UserConfig } from "vite";
import path from "path";

const config: UserConfig = {
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    md(),
    ssr({ prerender: true }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
    },
  },
  ssr: { noExternal: ["vuetify"] },
  // We manually add a list of dependencies to be pre-bundled, in order to avoid a page reload at dev start which breaks vite-plugin-ssr's CI
  optimizeDeps: { include: ["cross-fetch"] },
  preview: {
    port: 80
  }
};

export default config;

import cookie_js from "cookie_js";
import { createRouter, createWebHistory } from "vue-router";

import appStore from "../store";

import OurNews from "@/views/OurNews.vue";
import HomeView from "@/views/HomeView.vue";
import NewsView from "@/views/NewsView.vue";
import AdminView from "@/views/AdminView.vue";
import LoginView from "@/views/LoginView.vue";
import Management from "@/views/Management.vue";
import ShariahBoard from "@/views/ShariahBoard.vue";
import OurExperiences from "@/views/OurExperiences.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "home",
      path: "/",
      component: HomeView,
    },
    {
      name: "admin",
      path: "/admin/",
      component: AdminView,
      meta: { requiresAuth: true },
    },
    {
      name: "our-news",
      path: "/our-news",
      component: OurNews,
    },
    {
      name: "news",
      path: "/news/",
      component: NewsView,
      meta: { requiresCurrentNews: true },
    },
    {
      name: "experiences",
      path: "/experiences/",
      component: OurExperiences,
    },
    {
      name: "shariah-board",
      path: "/shariah/-board",
      component: ShariahBoard,
    },
    {
      name: "management",
      path: "/management/",
      component: Management,
    },
    {
      name: "login",
      path: "/login/",
      component: LoginView,
      meta: { requiresDeauth: true },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top when page changed
    return { top: 0 };
  },
});

router.beforeResolve((to) => {
  const store = appStore.useStore();
  let token = cookie_js.get(import.meta.env.VITE_TOKEN_KEY);

  if (to.meta.requiresAuth && !token) return "/login";
  if (to.meta.requiresDeauth && token) return "/";

  if (to.meta.requiresCurrentNews && !store.currentNews._id) return "/our-news";
});

export default router;

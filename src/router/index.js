import cookie_js from "cookie_js";
import { createRouter, createWebHistory } from "vue-router";

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
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminView,
      meta: { requiresAuth: true },
    },
    {
      path: "/our-news",
      name: "our-news",
      component: OurNews,
    },
    {
      path: "/news",
      name: "news",
      component: NewsView,
    },
    {
      path: "/experiences",
      name: "experiences",
      component: OurExperiences,
    },
    {
      path: "/shariah-board",
      name: "shariah-board",
      component: ShariahBoard,
    },
    {
      path: "/management",
      name: "management",
      component: Management,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { requiresLogout: true },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});

router.beforeResolve((to) => {
  let token = cookie_js.get(import.meta.env.VITE_TOKEN_KEY);
  if (to.meta.requiresAuth && !token) return "/login";
  if (to.meta.requiresLogout && token) return "/";
});

export default router;

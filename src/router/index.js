import cookie_js from "cookie_js";
import { createRouter, createWebHistory } from "vue-router";

import OurNews from "@/views/OurNews.vue";
import HomeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import LoginView from "@/views/LoginView.vue";
import OurServices from "@/views/OurServices.vue";
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
      path: "/experiences",
      name: "experiences",
      component: OurExperiences,
    },
    {
      path: "/our-services",
      name: "our-services",
      component: OurServices,
    },
    {
      path: "/shariah-board",
      name: "shariah-board",
      component: ShariahBoard,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { requiresLogout: true },
    },
  ],
});

router.beforeResolve((to) => {
  let token = cookie_js.get(import.meta.env.VITE_TOKEN_KEY);
  if (to.meta.requiresAuth && !token) return "/login";
  if (to.meta.requiresLogout && token) return "/";
});

export default router;

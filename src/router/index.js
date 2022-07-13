import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import OurNews from "@/views/OurNews.vue";
import LoginView from "@/views/LoginView.vue";
import OurExperiences from "@/views/OurExperiences.vue";
import ShariahBoard from "@/views/ShariahBoard.vue";
import OurServices from "@/views/OurServices.vue";

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
      // meta: { requiresAuth: true },
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
    },
  ],
});

router.beforeResolve((to) => {
  let token = localStorage.getItem("amanat_advisory");
  if (to.meta.requiresAuth && !token) return "/login";
});

export default router;

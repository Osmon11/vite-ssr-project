import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import BlogView from "@/views/BlogView.vue";
import LoginView from "@/views/LoginView.vue";

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
      path: "/blog",
      name: "blog",
      component: BlogView,
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

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/survey",
      name: "survey",
      component: () => import("../views/SurveyView.vue"),
    },
    {
      path: "/riddles",
      name: "riddles",
      component: () => import("../views/RiddleView.vue"),
    },
    {
      path: "/riddles-1",
      name: "riddles-1",
      component: () => import("../components/Riddles.vue"),
    },

    {
      path: "/scramble",
      name: "scramble",
      component: () => import("../views/ScrambleView.vue"),
    },
    {
      path: "/tech-quest-end",
      name: "tech-quest-end",
      component: () => import("../views/QuestEndView.vue"),
    },
    {
      path: "/true-false",
      name: "true-false",
      component: () => import("../views/TrueFalseView.vue"),
    },
    {
      path: "/guess-number",
      name: "guess-number",
      component: () => import("../views/GuessNumber.vue"),
    },
    {
      path: "/palette-game",
      name: "palette-game",
      component: () => import("../views/PaletteView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/SignUp.vue"),
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import("../components/ChatArea.vue"),
    },
    {
      path: "/redirect/*",
      name: "redirect",
      component: () => import("../views/Redirect.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../components/test.vue"),
    },
    // Catch-all route to redirect to the home route
    // {
    //   path: "/:catchAll(.*)",
    //   redirect: { name: "home" }, // Redirect to the "home" route
    // },
  ],
});

export default router;

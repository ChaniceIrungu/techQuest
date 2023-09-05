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
      component: () => import("../components/WordScramble.vue"),
    },
    {
      path: "/scramble-view",
      name: "scramble-view",
      component: () => import("../views/ScrambleView.vue"),
    },
    {
      path: "/tech-quest-end",
      name: "tech-quest-end",
      component: () => import("../views/QuestEndView.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../components/test.vue"),
    },
  ],
});

export default router;

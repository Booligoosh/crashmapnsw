import Home from "./pages/Home.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/crashes/bicycle" },
  // In future: Make dynamic route /crashes/:trafficUnitType and allow user to choose via dropdown:
  // "all crashes"
  // "crashes involving bicycles"
  // "crashes involving cars"
  // "crashes involving pedestrians"
  // "crashes involving trucks"
  // etc.
  { path: "/crashes/bicycle", component: Home },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

import { LocalStorageManager } from '@/shared/local-storage-manager';
import Vue from "vue";
import VueRouter, { Route } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routeAuthGuard = async (to: Route, from: Route, next: Function) => {
  const token = await LocalStorageManager.getToken();
  if (token) {
    next();
  } else {
    next({ path: '/login' });
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    beforeEnter: routeAuthGuard
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "views/popup/login" */ "../views/Login.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;

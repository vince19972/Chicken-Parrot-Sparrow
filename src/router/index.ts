import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Chicken from "../views/Chicken.vue";
import Parrot from "../views/Parrot.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/chicken",
    name: "Chicken",
    component: Chicken
  },
  {
    path: "/parrot",
    name: "Parrot",
    component: Parrot
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

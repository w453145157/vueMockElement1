import Vue from "vue";
import Router from "vue-router";
// import Goods from "com/goods/goods";

Vue.use(Router);
export default new Router({
  linkActiveClass: "active",
  routes: [
    {
      path: "/goods",
      component: () => import("com/goods/goods")
    },
    {
      path: "/ratings",
      component: () => import("com/ratings/ratings")
    },
    {
      path: "/seller",
      component: () => import("com/seller/seller")
    },
    {
      path: "/",
      redirect: "/goods"
    }
  ]
});

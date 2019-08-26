import Vue from "vue";
import App from "./App.vue";
import router from "@/router/index";
import axios from "axios";

import "styles/reset.css";
// import "styles/normalize.css";

import "styles/stylus/index.styl";

Vue.prototype.axios = axios;
Vue.config.productionTip = false;
// router.go("/goods");
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

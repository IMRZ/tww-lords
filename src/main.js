import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { sync } from "vuex-router-sync";
import tooltipDirective from "@/directives/tooltip";

Vue.config.productionTip = false;

Vue.directive("tooltip", tooltipDirective);

sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

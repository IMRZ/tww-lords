import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import tooltipDirective from "@/directives/tooltip";

Vue.config.productionTip = false;

Vue.directive("tooltip", tooltipDirective);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const SET_TOOLTIP = "SET_TOOLTIP";

export default new Vuex.Store({
  state: {
    tooltip: null
  },
  mutations: {
    [SET_TOOLTIP](state, tooltip) {
      state.tooltip = tooltip;
    }
  }
});

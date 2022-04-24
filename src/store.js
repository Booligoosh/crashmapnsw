import { createStore } from "vuex";

export default createStore({
  state: {
    currentCrash: null,
    routeCoords: null,
  },
  mutations: {
    setCurrentCrash(state, currentCrash) {
      state.currentCrash = currentCrash;
    },
    setRouteCoords(state, routeCoords) {
      state.routeCoords = routeCoords;
    },
  },
  actions: {},
  getters: {},
});

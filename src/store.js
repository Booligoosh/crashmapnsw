import { createStore } from "vuex";

export default createStore({
  state: {
    sidebarOpen: true,
    currentCrash: null,
    routeCoords: null,
  },
  mutations: {
    setSidebarOpen(state, sidebarOpen) {
      state.sidebarOpen = sidebarOpen;
    },
    setCurrentCrash(state, currentCrash) {
      state.currentCrash = currentCrash;
      if (currentCrash) state.sidebarOpen = true;
    },
    setRouteCoords(state, routeCoords) {
      state.routeCoords = routeCoords;
    },
  },
  actions: {},
  getters: {},
});

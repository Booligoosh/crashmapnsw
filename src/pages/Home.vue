<template>
  <main class="home-page">
    <Sidebar />
    <Map />
  </main>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import Map from "../components/Map.vue";

export default {
  components: { Sidebar, Map },
};
</script>

<style lang="scss">
@import "../global.scss";

.home-page {
  display: grid;
  grid-template-columns: 401px auto;
  height: 100vh;

  @media screen and (max-width: $floating-sidebar-breakpoint) {
    grid-template-columns: auto;
    height: calc(100vh - $floating-sidebar-collapse-btn-height);
  }

  > * {
    height: 100vh;
  }
}
</style>

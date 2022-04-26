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
.home-page {
  display: grid;
  grid-template-columns: 401px auto;
  height: 100vh;

  > * {
    height: 100vh;
  }
}
</style>

<template>
  <aside :class="{ sidebar: true, 'sidebar-closed': !sidebarOpen }">
    <button class="sidebar-close-btn" @click="toggleSidebar">
      {{ sidebarOpen ? "↓ Hide" : "↑ Show" }} information panel
    </button>
    <div class="sidebar-top" v-if="!isEmbed">
      <h1 class="sidebar-top-logo">CrashMap<span>NSW</span></h1>
    </div>
    <div class="sidebar-credits">
      Made by <a href="https://ethan.link" target="_blank">Ethan</a>. Data from
      <a
        href="https://opendata.transport.nsw.gov.au/dataset/nsw-crash-data"
        target="_blank"
        >TfNSW</a
      >. Source code on
      <a href="https://github.com/booligoosh/bikesafensw" target="_blank"
        >GitHub</a
      >. In beta 🚧
    </div>
    <CrashDetails />
    <FileUpload v-if="!isEmbed" />
  </aside>
</template>

<script>
import FileUpload from "./FileUpload.vue";
import CrashDetails from "./CrashDetails.vue";

export default {
  components: { FileUpload, CrashDetails },
  computed: {
    sidebarOpen() {
      return this.$store.state.sidebarOpen;
    },
    isEmbed() {
      return this.$route.query.embed === "1";
    },
  },
  methods: {
    toggleSidebar() {
      this.$store.commit("setSidebarOpen", !this.sidebarOpen);
    },
  },
};
</script>

<style lang="scss">
@import "../global.scss";

.sidebar {
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 27px -15px black;
  background-color: white;
  z-index: 9999;

  @media screen and (max-width: $floating-sidebar-breakpoint) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;

    transition: transform 250ms ease-out;

    &.sidebar-closed {
      transform: translateY(calc(100% - $floating-sidebar-collapse-btn-height));
    }
  }

  > * {
    padding: 1rem;
  }

  &-close-btn {
    border: none;
    font: inherit;
    cursor: pointer;
    color: inherit;

    background: hsl(210deg, 29%, 80%);
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 0.9rem;
    font-weight: bold;
    text-align: left;

    height: $floating-sidebar-collapse-btn-height;
    flex-shrink: 0;

    display: none;

    @media screen and (max-width: $floating-sidebar-breakpoint) {
      display: block;
    }
  }

  &-top {
    padding-top: 1.2rem;
    padding-bottom: 0;
    // background: hsl(120deg, 50%, 75%);
    // background: linear-gradient(105deg, var(--c1) 0%, var(--c1) 25%, var(--c2) 25%, var(--c2) 50%, var(--c3) 50%, var(--c3) 75%, var(--c4) 75%, var(--c4) 100%);
    // --c1: hsl(120deg, 50%, 53%);
    // --c2: #339af0;
    // --c3: #fab005;
    // --c4: #f76707;
    // color: white;
    background: hsl(210, 29%, 90%);

    &-logo {
      margin: 0;
      font-size: 1.95rem;
      line-height: 1;

      span {
        font-size: 0.5em;
      }
    }
  }

  &-credits {
    background: hsl(210, 29%, 90%);
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    font-size: 0.7rem;

    a {
      color: inherit;
      font-weight: inherit;
    }
  }
}
</style>

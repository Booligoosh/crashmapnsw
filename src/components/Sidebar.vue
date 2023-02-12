<template>
  <aside class="sidebar">
    <div class="sidebar-top" v-if="!isEmbed">
      <h1 class="sidebar-top-logo">CrashMap<span>NSW</span></h1>
    </div>
    <CrashDetails />
    <FileUpload v-if="!isEmbed" />
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
  </aside>
</template>

<script>
import FileUpload from "./FileUpload.vue";
import CrashDetails from "./CrashDetails.vue";

export default {
  components: { FileUpload, CrashDetails },
  computed: {
    isEmbed() {
      return this.$route.query.embed === "1";
    },
  },
};
</script>

<style lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 27px -15px black;
  z-index: 999;

  > * {
    padding: 1rem;
  }

  &-top {
    padding-top: 1.2rem;
    // background: hsl(120deg, 50%, 75%);
    // background: linear-gradient(105deg, var(--c1) 0%, var(--c1) 25%, var(--c2) 25%, var(--c2) 50%, var(--c3) 50%, var(--c3) 75%, var(--c4) 75%, var(--c4) 100%);
    // --c1: hsl(120deg, 50%, 53%);
    // --c2: #339af0;
    // --c3: #fab005;
    // --c4: #f76707;
    // color: white;
    background: hsl(120, 50%, 53%);

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
    background: #2c3e50;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 0.7rem;
    color: white;

    a {
      color: inherit;
      font-weight: inherit;
    }
  }
}
</style>

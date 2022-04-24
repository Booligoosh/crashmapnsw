<template>
  <aside class="sidebar">
    <div class="sidebar-top">
      <h1 class="sidebar-top-logo">BikeSafe<span>NSW</span></h1>
    </div>
    <FileUpload />
    <CrashDetails />
  </aside>
</template>

<script>
import FileUpload from "./FileUpload.vue";
import CrashDetails from "./CrashDetails.vue";

export default {
  components: { FileUpload, CrashDetails },
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
    padding-top: 3rem;
    padding-bottom: 0.5rem;
    // background: hsl(120deg, 50%, 75%);
    // background: linear-gradient(105deg, var(--c1) 0%, var(--c1) 25%, var(--c2) 25%, var(--c2) 50%, var(--c3) 50%, var(--c3) 75%, var(--c4) 75%, var(--c4) 100%);
    // --c1: hsl(120deg, 50%, 53%);
    // --c2: #339af0;
    // --c3: #fab005;
    // --c4: #f76707;
    color: white;
    background: hsl(120deg, 50%, 53%);

    &-logo {
      margin: 0;
      font-size: 1.95rem;

      span {
        font-size: 0.5em;
      }
    }
  }
}
</style>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <router-view />
</template>

<style lang="scss">
@import url("https://rsms.me/inter/inter.css");
html {
  font-family: "Inter", sans-serif;
}
@supports (font-variation-settings: normal) {
  html {
    font-family: "Inter var", sans-serif;
  }
}

* {
  box-sizing: border-box;
}

body {
  color: #2c3e50;
  margin: 0;
}

a {
  color: hsl(200, 90%, 38%);
  font-weight: 600;
}

dl {
  margin: 0;

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  > div {
    font-size: 0.9rem;

    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }

    dt {
      display: inline;
      font-weight: 600;

      &:after {
        content: ": ";
      }
    }

    dd {
      display: inline;
      margin: 0;
    }
  }
}
</style>

<template>
  <span
    :style="{
      color: color,
    }"
  >
    ●
  </span>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
    },
  },
};
</script>

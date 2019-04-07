<template>
  <span class="wh-icon" :class="icon"></span>
</template>

<script>
export default {
  props: {
    icon: String
  }
};
</script>

<style lang="scss" scoped>
.wh-icon {
  display: inline-block;
}

@import "~@/scss/flag-icons";
</style>

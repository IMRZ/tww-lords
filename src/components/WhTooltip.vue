<template>
  <div class="wh-tooltip">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.wh-tooltip {
  color: white;

  $slice: 18;
  border-image-slice: $slice $slice $slice $slice fill;
  border-image-width: #{$slice}px #{$slice}px #{$slice}px #{$slice}px;
  border-image-repeat: repeat;
  border-image-source: url("~@/assets/tooltip_frame.png");
}
</style>

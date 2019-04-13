<template>
  <div class="wh-frame-lord" v-tooltip="lord">
    <div class="frame"></div>
    <div :class="`portrait lord ${lord.character_image}`"></div>
  </div>
</template>

<script>
export default {
  props: { lord: Object }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/lord-portraits.scss";

.wh-frame-lord {
  position: relative;
}

.frame {
  width: 85px;
  height: 115px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  $slice: 20;
  border-image-slice: $slice $slice $slice $slice fill;
  border-image-width: #{$slice}px #{$slice}px #{$slice}px #{$slice}px;
  border-image-repeat: repeat;
  border-image-source: url("~@/assets/fe_lord_portrait_frame.png");
}

.wh-frame-lord.selected .frame {
  filter: sepia(100%) hue-rotate(60deg) saturate(400%);
}

.portrait {
  z-index: 5;
}

@keyframes glow {
  from {
    box-shadow: inset 0 0 20px 15px lime;
  }
  50% {
    box-shadow: inset 0 0 20px 0px lime;
  }
  to {
    box-shadow: inset 0 0 20px 15px lime;
  }
}

.wh-frame-lord.selected .portrait {
  animation: glow 1s ease-in-out infinite;
}
</style>

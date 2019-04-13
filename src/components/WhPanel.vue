<template>
  <div class="wh-panel">
    <div v-if="title" class="title">
      <WhTitle :class="title.type" :style="titleStyle">{{title.text}}</WhTitle>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import WhTitle from "@/components/WhTitle";

export default {
  components: { WhTitle },
  props: {
    title: Object
  },
  computed: {
    titleStyle() {
      if (this.title.text && this.title.text.length > 20) {
        return "font-size: 1.1em;"
      } else {
        return null;
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.wh-panel {
  position: relative;
  color: white;
  $slice: 60;
  border-image-slice: $slice $slice $slice $slice fill;
  border-image-width: #{$slice}px #{$slice}px #{$slice}px #{$slice}px;
  border-image-repeat: repeat;
  border-image-source: url("~@/assets/panel_back_frame.png");
  background-image: url("~@/assets/panel_back_tile.png");
  background-clip: content-box;
  height: 100%;
  padding: 0 8px;
  z-index: 5;
}

.wh-panel .wh-panel {
  border-image-source: url("~@/assets/panel_back_inner_frame.png");
  background-image: none;
  margin: 8px 0;
}

.wh-panel .wh-panel:not(:first-child) {
  margin-top: 34px;
}

.title {
  position: absolute;
  top: -25px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 10;
}

.wh-panel .wh-panel .title {
  top: -40px;
}
</style>

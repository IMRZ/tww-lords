<template>
  <div class="wh-panel">
    <div v-if="title" class="title">
      <WhTitle>{{title}}</WhTitle>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import WhTitle from "@/components/WhTitle";

export default {
  components: { WhTitle },
  props: { title: String }
};
</script>


<style lang="scss" scoped>
.wh-panel {
  position: relative;
  padding: 8px 8px;
  color: white;
  $slice: 60;
  border-image-slice: $slice $slice $slice $slice fill;
  border-image-width: #{$slice}px #{$slice}px #{$slice}px #{$slice}px;
  border-image-repeat: repeat;
  border-image-source: url("~@/assets/panel_back_frame.png");
  background-image: url("~@/assets/panel_back_tile.png");
  background-clip: content-box;
}

.title {
  position: absolute;
  top: -25px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}

.content {
  height: 100%;
  padding: 5px 0;
}

.title + .content {
  padding: 15px 0;
}
</style>

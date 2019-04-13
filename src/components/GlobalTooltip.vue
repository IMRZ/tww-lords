<template>
  <div id="tooltip" v-if="tooltip" :style="style">
    <div class="content">
      <div class="title">{{tooltip.character_name}}</div>
      <div class="field">
        <span class="field-name">Race: </span>
        <span>{{tooltip.subculture_name}}</span>
      </div>
      <div class="field">
        <span class="field-name">Faction: </span>
        <span class="icon">
          <WhIcon class="faction" :icon="`flags small ${tooltip.factionFlag}`" />
        </span>
        <span>{{tooltip.screen_name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import WhIcon from "@/components/WhIcon";

const OFFSET = 40;

export default {
  components: { WhIcon },
  props: { mouseEvent: MouseEvent },
  computed: {
    style() {
      if (this.mouseEvent && this.tooltip) {
        const { x, y } = this.mouseEvent;
        return {
          opacity: 1,
          ...this.getHorizontalPosition(x),
          ...this.getVerticalPosition(y)
        };
      } else {
        return { opacity: 0 };
      }
    },
    tooltip() {
      return this.$store.state.tooltip;
    }
  },
  methods: {
    getHorizontalPosition(x) {
      if (x > window.innerWidth * 0.8) {
        return { right: `${window.innerWidth - x + OFFSET}px` };
      } else {
        return { left: `${x + OFFSET}px` };
      }
    },
    getVerticalPosition(y) {
      if (y > window.innerHeight * 0.8) {
        return { bottom: `${window.innerHeight - y + OFFSET}px` };
      } else {
        return { top: `${y + OFFSET}px` };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#tooltip {
  position: fixed;
  pointer-events: none;
  filter: drop-shadow(0 0 15px #222222);
  transition: opacity 0.3s;
  color: white;
  z-index: 2000;

  $slice: 18;
  border-image-slice: $slice $slice $slice $slice fill;
  border-image-width: #{$slice}px #{$slice}px #{$slice}px #{$slice}px;
  border-image-repeat: repeat;
  border-image-source: url("~@/assets/tooltip_frame.png");
}

.content {
  padding: 8px 12px;
}

.title {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.field {
  font-size: 1.05em;
  display: flex;
  align-items: center;

  .field-name {
    display: inline-block;
    width: 120px;
    min-width: 120px;
  }

  .icon {
    display: flex;
    justify-content: center;
    margin-right: 4px;
  }
}
</style>

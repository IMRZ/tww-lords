<script>
import WhTooltip from "@/components/WhTooltip";

const OFFSET = 40;

export default {
  components: { WhTooltip },
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
    },
    renderTooltip() {
      if (!this.tooltip) return null;

      const type = this.tooltip.type;

      switch (type) {
        default:
          return <WhTooltip>
            <div class="content">{this.tooltip}</div>
          </WhTooltip>;
      }
    }
  },
  render() {
    return (
      <div id="map-tooltip" style={this.style}>
        {this.renderTooltip()}
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
#map-tooltip {
  position: fixed;
  pointer-events: none;
  filter: drop-shadow(0 0 15px #222222);
  transition: opacity 0.3s;
  color: #FFF8D7;
  max-width: 500px;
  z-index: 2000;
}

.content {
  padding: 10px;
  max-width: 250px;
}
</style>

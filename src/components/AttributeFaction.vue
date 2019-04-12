<template>
  <div :class="['attribute-faction', attributeStyle]">
    <WhIcon class="attribute-icon" :icon="`effect_bundles ${factionEffect.icon}`" />
    <div class="attribute-part">
      <template v-for="(part, index) in factionEffect.description">
        <WhIcon v-if="part.type === 'icon'" :key="`effect-${index}`" :icon="`${part.category} small ${part.data}`" />
        <span v-else :class="[part.style]" :key="`effect-${index}`">{{part.data}}</span>
      </template>
      <template v-if="factionEffect.scope.length > 0">
        <br />
        <template v-for="(part, index) in factionEffect.scope">
          <WhIcon v-if="part.type === 'icon'" :key="`scope-${index}`" :icon="`${part.category} small ${part.data}`" />
          <span v-else :key="`scope-${index}`">{{part.data}}</span>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import WhIcon from "@/components/WhIcon";

export default {
  components: { WhIcon },
  props: {
    factionEffect: Object
  },
  computed: {
    attributeStyle() {
      const { value, is_positive_value_good } = this.factionEffect;

      if (value > 0 && is_positive_value_good === false) {
        return "negative";
      } else if (value < 0 &&  is_positive_value_good === true) {
        return "negative";
      } else {
        return null;
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.attribute-faction {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: greenyellow;
  font-size: 1.05em;
}

.attribute-icon {
  margin: 2px 5px 2px 0;
}

.attribute-part {
  flex: 1;
  margin: 4px 0;
}

.negative {
  color: red;
}

.yellow {
  color: orange;
}
</style>

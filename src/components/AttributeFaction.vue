<template>
  <div :class="['attribute-faction', attributeStyle]">
    <WhIcon class="attribute-icon" :icon="`effect_bundles ${factionEffect.icon}`" />
    <div class="attribute-part">
      <template v-for="(part, index) in factionEffect.description" >
        <template v-if="part.type === 'icon'"><WhIcon :key="index" :icon="`${part.category} small ${part.data}`" /></template>
        <span :class="{ special: part.style }" :key="index" v-else>{{part.data}}</span>
      </template>
    </div>
  </div>
</template>

<script>
import WhIcon from "@/components/WhIcon";

// :class="getFactionEffectStyles(factionEffect)"

export default {
  components: { WhIcon },
  props: {
    factionEffect: Object
  },
  computed: {
    attributeStyle() {
      const { value, is_positive_value_good } = this.factionEffect;
      console.log(this.factionEffect);
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
  display: flex;
  flex-direction: row;
  align-items: center;
  color: greenyellow;
}

.attribute-icon {
  margin: 5px;
}

.attribute-part {
  flex: 1;
}

.negative {
  color: red;
}

.special {
  color: orange;
}
</style>

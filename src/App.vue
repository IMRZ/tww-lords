<template>
  <div class="app" v-on="eventListeners">
    <GlobalTooltip :mouseEvent="mouseEvent" />
    <div class="outer">
      <WhPanel class="outer-panel" :title="selectedLord.subculture_name">
        <div class="outer-panel-content">
          <WhPanel>
            <div class="placeholder">PLACEHOLDER</div>
          </WhPanel>
          <WhPanel title="Race Attributes">
            <div class="faction-mechanics">
              <div class="faction-bullet" v-for="([icon, text], index) in selectedLord.localised_mechanics" :key="index">
                <WhIcon class="faction-bullet-icon" :icon="`${icon.category} ${icon.data}`" />
                <span class="faction-bullet-text">{{text.data}}</span>
              </div>
            </div>
          </WhPanel>
        </div>
      </WhPanel>
    </div>
    <div class="center">
      <WhTitle class="large">Select Lord</WhTitle>
      <div class="container">
        <WhFrameLord
          :class="{ selected: (lord === selectedLord), defaults: true }"
          v-for="lord in lords"
          :key="lord.key"
          :lord="lord"
          @click.native="onClick(lord)"
        />
      </div>
      <WhPanel style="width: 850px; margin-top: 30px;" :subtitle="selectedLord.character_name">
        <!-- selectedLord.localised_description -->
        <div class="placeholder">PLACEHOLDER</div>
      </WhPanel>
    </div>
    <div class="outer">
      <WhPanel class="outer-panel" :title="selectedLord.screen_name">
        <div class="outer-panel-content">
          <WhPanel>
            <div class="misc">
              <div class="challenge">
                <span style="opacity: 0.5;">Initial challenge: </span>
                <span v-if="selectedLord.difficulty === 'very_hard'" style="color: red;">Very Hard</span>
                <span v-else-if="selectedLord.difficulty === 'hard'" style="color: red;">Hard</span>
                <span v-else-if="selectedLord.difficulty === 'normal'" style="color: white;">Normal</span>
                <span v-else-if="selectedLord.difficulty === 'easy'" style="color: white;">Easy</span>
              </div>
              <WhIcon class="faction" :icon="`flags ${selectedLord.factionFlag}`" />
            </div>
          </WhPanel>
          <WhPanel title="Faction effects" style="padding: 10px;">
            <AttributeFaction
              v-for="(factionEffect, index) in selectedLord.faction_effects.faction_traits"
              :key="index"
              :factionEffect="factionEffect"
            />
          </WhPanel>
          <WhPanel title="Lord effects" style="padding: 10px;">
            <AttributeFaction
              v-for="(factionEffect, index) in selectedLord.faction_effects.lord_traits"
              :key="index"
              :factionEffect="factionEffect"
            />
          </WhPanel>
        </div>
      </WhPanel>
    </div>
  </div>
</template>

<script>
import lords from "@/store/lords.json";
import WhFrameLord from "@/components/WhFrameLord";
import WhTitle from "@/components/WhTitle";
import WhPanel from "@/components/WhPanel";
import WhIcon from "@/components/WhIcon";
import GlobalTooltip from "@/components/GlobalTooltip";

import AttributeFaction from "@/components/AttributeFaction";

function compare(a, b) {
  if (a.military_group < b.military_group) return -1;
  if (a.military_group > b.military_group) return 1;
  return 0;
}

const campaign = {
  vortex: Object.values(lords)
    .filter(entry => entry.key.includes("_vor_") === true)
    .sort((a, b) => compare(a, b)),
  mortal: Object.values(lords)
    .filter(entry => entry.key.includes("_vor_") === false)
    .sort((a, b) => compare(a, b))
};

export default {
  components: {
    WhFrameLord,
    WhTitle,
    WhPanel,
    WhIcon,
    GlobalTooltip,

    AttributeFaction
  },
  data() {
    return {
      lords: campaign.mortal,
      selectedCampaign: "mortal",
      selectedLord: campaign.mortal[0],
      mouseEvent: null,
      eventListeners: {
        mousemove: (mouseEvent) => this.mouseEvent = mouseEvent,
        mouseleave: () => this.mouseEvent = null
      }
    };
  },
  methods: {
    onClick(lord) {
      this.selectedLord = lord;
    },
    getFactionEffectStyles(factionEffect) {
      const result = [];
      if (factionEffect.value > 0 && factionEffect.is_positive_value_good === false) {
        result.push("red");
      }
      return result;
    }
  }
};
</script>

<style lang="scss">
@import "~@/scss/lord-portraits.scss";

html {
  box-sizing: border-box;
  height: 100%;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  height: 100%;

  background-size: 100% 100%;
  background-image: url("~@/assets/battle_land_1.png");

  overflow: hidden;
}

.app {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.quote {
  color: yellow;
  font-style: italic;
}

.red {
  color: red;
}

.misc {
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .challenge {
    font-size: 1.3em;
  }

  .faction {
    margin: 5px;
  }
}

.placeholder {
  display: flex;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.faction-mechanics {
  color: greenyellow;
  padding: 5px;
}

.faction-bullet {
  display: flex;
  align-items: center;
  margin: 10px 5px;

  &-icon {
    min-width: 36px;
    min-height: 36px;
    margin-right: 10px;
  }
}

.outer {
  width: 25%;
  height: 100%;
  color: white;
  padding: 70px 20px;
  overflow: hidden;

  .outer-panel {
    height: 100%;
  }

  .outer-panel-content {
    padding: 0 8px;
    max-height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  height: 100%;
  width: 50%;
}

.container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: flex-start;
}

.defaults {
  filter: brightness(70%);
  cursor: pointer;
}

.defaults:hover {
  filter: brightness(100%);
}

.defaults.selected {
  filter: brightness(100%);
}
</style>

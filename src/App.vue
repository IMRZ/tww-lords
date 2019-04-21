<template>
  <div class="app" v-on="eventListeners">
    <GlobalTooltip :mouseEvent="mouseEvent" />
    <div class="outer">
      <WhPanel class="panel-character" :title="{ text: selectedLord.character_name }">
        <div class="panel-character-content">
          <div class="panel-character-content-scroll-wrapper">
            <p
              v-for="(part, index) in selectedLord.localised_description"
              :key="index"
              :class="{ quote: part.type === 'quote' }"
            >
              {{part.text}}
            </p>
          </div>
        </div>
      </WhPanel>
    </div>
    <div class="center">
      <div class="center-controls">
        <WhTitle class="large">Select Lord</WhTitle>
      </div>
      <div style="margin: 20px;">
        <button @click="random" :disabled="isRandomButtonDisabled">Select random</button>
      </div>
      <div class="container">
        <WhFrameLord
          :class="{ selected: (lord === selectedLord), defaults: true }"
          v-for="lord in lords"
          :key="lord.key"
          :lord="lord"
          @click.native="onClick(lord)"
        />
      </div>
    </div>
    <div class="outer">
      <WhPanel :title="{ text: selectedLord.screen_name }" class="panel-faction">
        <div class="panel-faction-content">
          <WhPanel style="overflow: hidden; padding: 16px 8px;">
            <div style="height: 100%; overflow: auto;">
              <div class="misc">
                <div class="challenge">
                  <span style="opacity: 0.5;">Initial challenge: </span>
                  <span v-if="selectedLord.difficulty === 'very_hard'" style="color: red;">Very Hard</span>
                  <span v-else-if="selectedLord.difficulty === 'hard'" style="color: red;">Hard</span>
                  <span v-else-if="selectedLord.difficulty === 'normal'" style="color: white;">Normal</span>
                  <span v-else-if="selectedLord.difficulty === 'easy'" style="color: white;">Easy</span>
                </div>
                <WhIcon class="faction" :icon="`flags ${selectedLord.factionFlag}`" />
                <div style="width: 100%; font-size: 1.25em;"><span>Faction effects</span></div>
                <div style="width: 100%;">
                  <AttributeFaction
                    v-for="(factionEffect, index) in selectedLord.faction_effects.faction_traits"
                    :key="index"
                    :factionEffect="factionEffect"
                  />
                </div>
                <div style="width: 100%; font-size: 1.25em;"><span>Lord effects</span></div>
                <div style="width: 100%;">
                  <AttributeFaction
                    v-for="(factionEffect, index) in selectedLord.faction_effects.lord_traits"
                    :key="index"
                    :factionEffect="factionEffect"
                  />
                </div>
              </div>
            </div>
          </WhPanel>
           <WhPanel :title="{ text: selectedLord.subculture_name }" style="flex: 0 1;">
            <div class="faction-mechanics">
              <div style="width: 100%; font-size: 1.25em; color: white; margin: 10px 0 0 10px;">Race Attributes</div>
              <div style="font-size: 1.04em;" class="faction-bullet" v-for="([icon, text], index) in selectedLord.localised_mechanics" :key="index">
                <WhIcon class="faction-bullet-icon" :icon="`${icon.category} ${icon.data}`" />
                <span class="faction-bullet-text">{{text.data}}</span>
              </div>
            </div>
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

import { shuffle } from "@/util/shuffle";

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
      mouseEvent: null,
      eventListeners: {
        mousemove: (mouseEvent) => this.mouseEvent = mouseEvent,
        mouseleave: () => this.mouseEvent = null
      },
      isRandomButtonDisabled: false,
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
    },
    async random() {
      this.isRandomButtonDisabled = true;

      const randomPath = shuffle(this.lords.slice());

      console.log(randomPath.length)

      for (let i = 0; i < randomPath.length; i++) {
        await new Promise((resolve) => {
          setTimeout(() => {
            this.selectedLord = randomPath[i];
            resolve();
          }, i * 3);
        });
      }
      this.isRandomButtonDisabled = false;
    }
  },
  computed: {
    selectedLord: {
      get() {
        const key = this.$store.state.route.query.lord;

        if (key) {
          return this.lords.find(lord => lord.key === key) || this.lords[0];
        } else {
          this.$router.replace({
            query: {
              lord: this.lords[0].key
            }
          });
          return this.lords[0];
        }
      },
      set(lord) {
        this.$router.replace({
          query: {
            lord: lord.key
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=IM+Fell+Great+Primer');

html {
  box-sizing: border-box;
  height: 100%;
  font-family: 'IM Fell Great Primer', serif;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0;
  height: 100%;

  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("~@/assets/battle_land_1.png");

  overflow: hidden;
}

.app {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  padding: 100px 20px;
  overflow: hidden;

  .outer-panel {
    height: 100%;
  }

  .outer-panel-content {
    padding: 0 8px;
    max-height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}

.panel-character {
  height: 100%;
  font-size: 1.05em;
}

.panel-character-content {
  height: 100%;
  padding: 32px 16px;
  overflow: hidden;
}

.panel-character-content-scroll-wrapper {
  height: 100%;
  overflow: auto;
}

.panel-faction {
  height: 100%;
}

.panel-faction-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 8px;
  overflow: hidden;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  height: 100%;
  width: 50%;
}

.center-controls {
  height: 150px;
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

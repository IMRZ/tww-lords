<template>
  <span class="wh-icon" :class="icon"></span>
</template>

<script>
export default {
  props: {
    icon: String
  }
};
</script>

<style lang="scss" scoped>
.wh-icon {
  display: inline-block;
}

@import "~@/scss/faction-bullets-icons";

@import "~@/scss/skins";
@import "~@/scss/flags";
@import "~@/scss/effect_bundles";

@each $flag in $flags {
  .wh-icon.flags.#{$flag} {
    width: 64px;
    height: 64px;
    background-size: contain;
    background-image: url("~@/assets/flags/#{$flag}/mon_64.png");
  }
}

.wh-icon.flags.small.wh2_dlc09_tmb_exiles_of_nehek {
  width: 16px;
  height: 16px;
  background-size: contain;
  background-image: url("~@/assets/flags/wh2_main_def_cult_of_pleasure/mon_24.png");
}

.wh-icon.flags.small.wh2_main_def_cult_of_pleasure {
  width: 16px;
  height: 16px;
  background-size: contain;
  background-image: url("~@/assets/flags/wh2_main_def_cult_of_pleasure/mon_24.png");
}

@each $skin in $default {
  .wh-icon.default.#{$skin} {
    width: 16px;
    height: 16px;
    background-size: contain;
    background-image: url("~@/assets/icons/skins/default/#{$skin}.png");
  }
}

@each $ef in $effect_bundles {
  .wh-icon.effect_bundles.#{$ef} {
    width: 24px;
    height: 24px;
    background-size: contain;
    background-image: url("~@/assets/effect_bundles/#{$ef}.png");
  }
}
</style>

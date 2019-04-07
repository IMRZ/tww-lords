<template>
  <div class="wh-title">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wh-title {
  width: 544px;
  height: 59px;
  min-height: 59px;
  min-width: 544px;

  background-image: url("~@/assets/panel_title.png");
  background-size: contain;
  background-repeat: no-repeat;
  color: white;

  padding: 14px 145px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
}

.large {
  width: 769px;
  height: 69px;
  min-width: 769px;
  min-height: 69px;

  background-image: url("~@/assets/panel_title_large.png");
  background-size: contain;
  background-repeat: no-repeat;

  padding: 18px 206px 22px 206px;
  font-size: 1.5em;
}

.sub {
  width: 320px;
  height: 52px;
  min-width: 320px;
  min-height: 52px;

  background-image: url("~@/assets/panel_subtitle.png");
  background-size: contain;
  background-repeat: no-repeat;

  padding: 12px 70px;
  font-size: 1.1em;
}
</style>

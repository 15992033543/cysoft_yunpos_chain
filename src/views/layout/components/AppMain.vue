<template>
  <transition name="anim">
    <keep-alive :include="$store.state.keepAlive.alivePages">
      <router-view class="app-main"/>
    </keep-alive>
  </transition>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>

<style lang="scss">
  .app-main {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 55px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 15px 15px 80px 15px;
  }
  $duration: .2s;
  .anim-enter-active {
    transition: all $duration $duration;
  }
  .anim-leave-active {
    transition: all $duration;
  }
  .anim-enter {
    opacity: 0;
    transform: translateY(2%);
  }
  .anim-leave-to {
    opacity: 0;
    transform: translateY(-2%);
  }
</style>

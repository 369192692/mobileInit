<template>
  <div id="app" :class="{ios:isIOS}">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <loading></loading>
    <app-foot></app-foot>
  </div>
</template>

<script>
  import Loading from '@/components/Loading'
  import AppFoot from '@/components/AppFoot'
  export default {
    name: 'app',
    components: {
      Loading,
      AppFoot
    },
    computed: {
      isIOS() {
        return !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "assets/style/config.scss";

  #app {
    height: 100%;
  }

</style>

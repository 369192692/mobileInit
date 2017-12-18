<template>
  <div id="app-foot" v-if="visible">
    <a :class="{on:selected===0}" @click="onSelected(0)">page1</a>
    <a :class="{on:selected===1}" @click="onSelected(1)">page2</a>
    <a :class="{on:selected===2}" @click="onSelected(2)">page3</a>
  </div>
</template>
<script>
  const NAMES = ['page1', 'page2', 'page3']
  import service from '@/service'
  export default {
    name: 'app-foot',
    data() {
      return {
      }
    },
    computed: {
      visible() {
        return service.system.store.footVisible
      },
      selected() {
        return NAMES.indexOf(this.$route.name)
      }
    },
    methods: {
      onSelected(target) {
        if(this.selected === target) {
          return
        }
        this.$router.push({name: NAMES[target]})
      }
    },
    mounted() {
    }
  }
</script>
<style scoped lang="scss">
  @import '../assets/style/config';

  #app-foot {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: $foot-height;
    display: flex;
    align-items: center;
    text-align: center;
    color: $text-light-color;
    background-color: $color-white;
    font-size: rem(12);
    /*box-shadow: 0 -1px 5px $color-shadow-1;*/
    a {
      flex: 1;
      padding-top: rem(30);
      background-position: top;
      background-repeat: no-repeat;
      background-size: rem(23) rem(23);
      &.on {
        color: $text-primary-color;
      }
      &:nth-child(1) {
        /*background-image: url("../assets/images/unchoosen_list.png");*/
        &.on {
          /*background-image: url("../assets/images/choosen_list.png");*/
        }
      }
      &:nth-child(2) {
        /*background-image: url("../assets/images/unchoosen_task.png");*/
        &.on {
          /*background-image: url("../assets/images/choosen_task.png");*/
        }
      }
      &:nth-child(3) {
        /*background-image: url("../assets/images/unchoosen_personal.png");*/
        &.on {
          /*background-image: url("../assets/images/choosen_personal.png");*/
        }
      }
    }
  }
</style>

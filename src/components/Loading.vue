<template>
  <mt-popup id="loading"
            popup-transition="popup-fade"
            :value="visible"
            :modal="false"
            :closeOnClickModal="false">
    <mt-spinner></mt-spinner>
  </mt-popup>
</template>
<script>
  import service from '@/service'
  export default {
    name: 'loading',
    computed: {
      visible() {
        return service.system.store.loading
      }
    }
  }
</script>
<style scoped lang='scss'>
  #loading {
    padding: 20px;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.7);
  }
</style>

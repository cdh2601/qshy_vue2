<template>
  <div id="app">
    <router-view v-if="isShow" ></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return {
      isShow:true
    }
  },
  methods:{
    reload(){
      this.isShow=false;
      this.$nextTick(function(){
        this.show=true
      })
    }
  }
};
</script>
<style scoped>
</style>


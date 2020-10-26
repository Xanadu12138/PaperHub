<template>
  <div id="app">
    <ph-navbar></ph-navbar>
    <router-view name="main"></router-view>
  </div>
</template>

<script>
import Navbar from './views/Navbar.vue'

export default {
  name: 'App',
  components: {
      'ph-navbar': Navbar
  },
  data () {
    return {
    }
  },
  // 解决刷新页面store清空
  methods:{
    //将store中的数据存放到sessionStorage
    saveState() {
      sessionStorage.setItem("state", JSON.stringify(this.$store.state));
    }
  },
  created() {
    // 向window添加unload事件
    window.addEventListener("unload", this.saveState);
  }
}
</script>

<style lang="scss">
@import "./assets/index.scss";
</style>

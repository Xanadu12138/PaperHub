<template>
  <div id="app">
    <pm-navbar></pm-navbar>
    <router-view name="main"></router-view>
  </div>
</template>

<script>
import Navbar from './views/Navbar'

export default {
  name: 'App',
  components: {
    'pm-navbar': Navbar
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
@import "./assets/index.scss";
</style>

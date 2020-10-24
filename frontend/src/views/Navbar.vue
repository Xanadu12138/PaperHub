<template>
  <b-navbar class="is-primary is-bold"> 
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        PaperHub
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item @click="goHome">
        我的论文
      </b-navbar-item>
      <b-navbar-item @click="goPublic">
        公共论文
      </b-navbar-item>
      <!--        labs selection dropdown in details-->
      <router-view name="dropdown"></router-view>
    </template>
    <template slot="end">
      <b-navbar-item tag="div">
        <router-view name="btn"></router-view>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
// import Info from '../components/navbar/Info'


export default {
  name: 'Navbar',
  components: {
    // info: Info
  },
  methods: {
    goHome () {
      this.$router.push('/home')
    },
    goPublic () {
      this.$router.push('/public')
    }
  }
}
</script>

<style scoped>

</style>

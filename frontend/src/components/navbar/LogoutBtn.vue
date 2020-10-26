<template>
  <div>
    <b-tag type="is-large is-primary">{{$store.state.userInfo.userID}}</b-tag>
    <button class="button" @click="logout">
      注 销
    </button>
  </div>
</template>

<script>

export default {
  name: 'LogoutBtn',
  methods: {
    logout () {
      this.$router.push('/')
      this.$store.commit('clearUserInfo')
      document.cookie = ""
    }
  }
}
</script>

<style scoped>

</style>

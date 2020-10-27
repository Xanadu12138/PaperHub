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
      const path = `http://localhost:8000/signOut`
      this.$axios.post(path)
      .then(response => {
      }).catch(err => {
        console.log(err)
      })
      document.cookie = ""
    }
  }
}
</script>

<style scoped>

</style>

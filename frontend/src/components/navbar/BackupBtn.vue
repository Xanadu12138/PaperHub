<template>
  <div>
    <b-tag type="is-large is-primary">Admin</b-tag>
    <button class="button" @click="backup">
      备份数据库
    </button>
    <button class="button" @click="logout">
      注 销
    </button>
  </div>
</template>

<script>

export default {
  name: 'BackupBtn',
  methods: {
    backup() {
        this.$axios.post('/api/backupDB')
        .then(response => {
            alert('备份数据库成功')
        }).catch(err => {
            console.log(err)
            alert('备份数据库失败')
        })
    },
    logout() {
      this.$router.push('/')
      this.$store.commit('clearAdminInfo')
    //   const path = `/signOut`
    //   this.$axios.post(path)
    //   .then(response => {
    //   }).catch(err => {
    //     console.log(err)
    //   })
      document.cookie = ""
    }
  }
}
</script>

<style scoped>

</style>
